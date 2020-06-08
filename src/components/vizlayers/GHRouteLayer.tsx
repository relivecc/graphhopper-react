
/** @jsx jsx */
import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import LinkIcon from '@atlaskit/icon/glyph/link';
import LocationIcon from '@atlaskit/icon/glyph/location';
import Textarea from '@atlaskit/textarea';
import Textfield from '@atlaskit/textfield';
import { jsx } from '@emotion/core';
import * as graphhopper from "@relive/graphhopper-api-client";
import { RoutingAPIApiGetRouteRequest } from '@relive/graphhopper-api-client';
import { getCustomRoute } from '@relive/graphhopper-api-client/build/experimentalAPI';
import { VehicleProfileId } from '@relive/graphhopper-api-client/build/generated/graphhopper-api/model';
import { Layer, PathLayer } from 'deck.gl';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DragEvent, Marker } from 'react-map-gl';
import { GRAPHHOPPER_BASE_URI } from '../../config';
import MapContext from '../../context/MapContext';
import decodePath from '../../util/decodePath';
import { LatLonArray, latLonToString } from '../../util/types';
import { useDebounce } from '../../util/useDebounce';
import { SettingsPortal } from '../SettingsPortal';
import { usePersistedState } from '../../util/usePersistentState';
import ColorPicker from '@atlaskit/color-picker';
import { DEFAULT_PALETTE, DEFAULT_PALETTE_ATLASKIT, hexStrToRGB } from '../../util/colors';

const routingAPI = new graphhopper.RoutingAPIApi(undefined, GRAPHHOPPER_BASE_URI);

type Action = "set-start" | "set-end";

const bikeNetwork =
{
    "priority": {
        "bike_network": {
            "other": 0.1,
            "*": 1
        }
    }
};

const GHRouteLayer: React.FunctionComponent<{ sidebarElement: Element | undefined, setLayers: (myKey: string, layers: Array<Layer<any> | undefined | false>) => void, myKey: string }> = (props) => {
    const [alternateRoutes, setAlternateRoutes] = usePersistedState<boolean>(props.myKey + "-alt", false);
    const [action, setAction] = useState<Action>();
    const [hoverPosition, setHoverPosition] = useState<LatLonArray>();
    const [startPosition, setStartPosition] = usePersistedState<LatLonArray>(props.myKey + "-start");
    const [endPosition, setEndPosition] = usePersistedState<LatLonArray>(props.myKey + "-end");

    const [startLinkedToGlobal, setStartLinkedToGlobal] = useState(false);
    const [endLinkedToGlobal, setEndLinkedToGlobal] = useState(false);

    const [json, setJson] = usePersistedState(props.myKey + "-json", "");
    const [color, setColor] = usePersistedState(props.myKey + "-color", DEFAULT_PALETTE[0]);

    const [routes, setRoutes] = useState<LatLonArray[][]>([]);

    const dispatchAction = useCallback((action: Action | undefined) => {
        context.onActionChange.dispatch(action, props.myKey);
    }, []);



    useEffect(() => {
        if (action === "set-start" && startPosition !== hoverPosition) {
            setStartPosition(hoverPosition!);
        }

        if (action === "set-end" && endPosition !== hoverPosition) {
            setEndPosition(hoverPosition!);
        }
    }, [action, hoverPosition, startPosition, endPosition])

    // TODO: should useMemo or not? document
    const routeParameters = useDebounce(useMemo(() => {
        return {
            startPosition,
            endPosition
        };
    }, [startPosition, endPosition]), 100); // TODO: cancel pending requests?

    useEffect(() => {
        const layer = !!routes.length && new PathLayer({
            id: "deck-" + props.myKey,
            data: routes.map((r, i) => ({ path: r, alternate: i > 0 })),
            getPath: d => d.path as any,
            getColor: d => [...hexStrToRGB(color), d.alternate ? 80 : 255],
            getWidth: d => 5,
            widthUnits: "pixels",
        });
        props.setLayers(props.myKey, [layer]);
    }, [routes, color]);

    const context = useContext(MapContext);
    useEffect(() => {
        const handlers = [
            context.onClick.subscribe((info, e) => {
                dispatchAction(undefined);
            }),
            context.onActionChange.subscribe((action, source) => {
                console.log("action", action, source, props.myKey);
                console.log("linked", startLinkedToGlobal);
                if (source === props.myKey || action === undefined) {

                    setAction(action);
                    return;
                }
                if (action === "set-start" && startLinkedToGlobal) {
                    setAction(action);
                } else if (action === "set-end" && endLinkedToGlobal) {
                    setAction(action);
                }
            }),
            context.onHover.subscribe((info, e) => {
                if (!info.coordinate) {
                    return;
                }
                if (action) {
                    setHoverPosition([...info.coordinate as number[]].reverse() as LatLonArray);
                }
            })
        ];
        return () => {
            handlers.forEach(h => h());
        }
    }, [action, startLinkedToGlobal, endLinkedToGlobal])

    const onStartDragStartPosition = useCallback((event: DragEvent) => {
        dispatchAction("set-start");
    }, []);

    const onDrag = useCallback((event: DragEvent) => {
        // setHoverPosition(event.lngLat.reverse());
        context.onHover.dispatch({
            coordinate: event.lngLat
        } as any /* hacky */, undefined as any /* hacky */)
    }, []);

    const onStartDragEndPosition = useCallback((event: DragEvent) => {
        dispatchAction("set-end");
    }, []);

    const onStopDrag = useCallback((event: DragEvent) => {
        dispatchAction(undefined);
    }, []);

    useEffect(() => {
        if (!startPosition || !endPosition) {
            return;
        }
        console.log("querying route");
        (async () => {
            try {
                const elevation = false;
                const editorCode = json.trim();

                const params: RoutingAPIApiGetRouteRequest = {
                    point: [startPosition, endPosition].map(c => c.join()),
                    vehicle: VehicleProfileId.Bike,
                    elevation,
                    algorithm: alternateRoutes ? "alternative_route" : undefined,
                };

                const routes = editorCode ?
                    await getCustomRoute({
                        ...params,
                        ...JSON.parse(editorCode),
                        vehicle: undefined,
                        points: [[...startPosition].reverse(), [...endPosition].reverse()],
                        point: undefined,
                        profile: "bike"
                    }, GRAPHHOPPER_BASE_URI)
                    : await routingAPI.getRoute(params);

                if (routes.data.paths) {
                    const routePaths = routes.data.paths.map(path => {

                        if (!path.points_encoded) {
                            throw new Error("unencoded points not implemented");
                        }
                        if (typeof path.points !== "string") {
                            throw new Error("unexpected path.points not string");
                        }
                        const decoded = decodePath(path.points, elevation);
                        return decoded;
                    }
                    );
                    setRoutes(routePaths);

                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [routeParameters, alternateRoutes, json]);

    const CP = ColorPicker as any;
    const textAreaRef = useRef<any>();
    // console.log("renderside", props.myKey, props.sidebarElement, startPosition);
    return (
        <React.Fragment>
            {startPosition &&
                <Marker longitude={startPosition[1]} latitude={startPosition[0]}
                    draggable={true}
                    onDrag={onDrag}
                    onDragStart={onStartDragStartPosition}
                    onDragEnd={onStopDrag}
                    captureClick={action == undefined}>
                    <div css={{

                        position: "relative",
                        transform: "translate(-50%, -100%)"
                    }}>
                        <LocationIcon label="" primaryColor="green" />
                    </div>
                </Marker>
            }
            {endPosition &&
                <Marker longitude={endPosition[1]} latitude={endPosition[0]}
                    draggable={true}
                    onDrag={onDrag}
                    onDragStart={onStartDragEndPosition}
                    onDragEnd={onStopDrag}
                    captureClick={action == undefined}>
                    <div css={{

                        position: "relative",
                        transform: "translate(-50%, -100%)"
                    }}>
                        <LocationIcon label="" primaryColor="red" />
                    </div>
                </Marker>
            }
            {props.sidebarElement && <SettingsPortal domNode={props.sidebarElement}>
                <div>
                    <label htmlFor="xsmall">From:</label>
                    <div
                        css={{
                            flex: 0,
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <Textfield isReadOnly value={latLonToString(startPosition)} />
                        <Button isSelected={action === "set-start"} onClick={() => dispatchAction("set-start")}>
                            <LocationIcon label="" primaryColor="green" />
                        </Button>
                        <Button isSelected={startLinkedToGlobal} onClick={() => setStartLinkedToGlobal(!startLinkedToGlobal)}>
                            <LinkIcon label="" />
                        </Button>
                    </div>
                    <label htmlFor="xsmall">To:</label>
                    <div
                        css={{
                            flex: 0,
                            alignItems: 'center',
                            display: 'flex',
                        }}
                    >
                        <Textfield isReadOnly value={latLonToString(endPosition)} />
                        <Button isSelected={action === "set-end"} onClick={() => dispatchAction("set-end")}>
                            <LocationIcon label="" primaryColor="red" />
                        </Button>
                        <Button isSelected={endLinkedToGlobal} onClick={() => setEndLinkedToGlobal(!endLinkedToGlobal)}>
                            <LinkIcon label="" />
                        </Button>
                    </div>
                    <Checkbox css={{ marginTop: "20px" }}
                        isChecked={alternateRoutes}
                        onChange={() => setAlternateRoutes(!alternateRoutes)}
                        label="Alternate routes"
                    />
                    <label>Flex mode:</label>
                    <Textarea css={{ minHeight: "300px !important" }} ref={textAreaRef} defaultValue={json} onChange={(val) => setJson(val.target.value)}></Textarea>

                    <Button onClick={() => {
                        textAreaRef.current!.value = JSON.stringify(bikeNetwork, undefined, 2);
                        setJson(textAreaRef.current!.value);
                    }}>
                        Bike network template
                    </Button>
                    {/* <Button onClick={downloadGPX}>
                        Download GPX
                    </Button> */}
                    <div>
                        Color:
                    <CP
                            label="Change color"
                            palette={DEFAULT_PALETTE_ATLASKIT}
                            selectedColor={color}
                            cols={6}
                            onChange={(newColor: string) => setColor(newColor)}
                        />
                    </div>
                </div>

            </SettingsPortal>}

        </React.Fragment >
    )

}

export default GHRouteLayer;