
/** @jsx jsx */
import Button from '@atlaskit/button';
import LocationIcon from '@atlaskit/icon/glyph/location';
import Textfield from '@atlaskit/textfield';
import { jsx } from '@emotion/core';
import { Layer, PathLayer } from 'deck.gl';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DragEvent, Marker } from 'react-map-gl';
import { GRAPHHOPPER_BASE_URI } from '../../config';
import MapContext from '../../context/MapContext';
import { LatLonArray, latLonToString } from '../../util/types';
import { useDebounce } from '../../util/useDebounce';
import { SettingsPortal } from '../SettingsPortal';
import { VehicleProfileId } from '@relive/graphhopper-api-client/build/generated/graphhopper-api/model';
import { getSPT } from '@relive/graphhopper-api-client/build/experimentalAPI';
import { usePersistedState } from '../../util/usePersistentState';

type Action = "set-start";

const IsochroneLayer: React.FunctionComponent<{ sidebarElement: Element | undefined, setLayers: (myKey: string, layers: Array<Layer<any> | undefined | false>) => void, myKey: string }> = (props) => {
    const [action, setAction] = useState<Action>();
    const [distanceLimit, setDistanceLimit] = usePersistedState<number>(props.myKey + "-distance", 5000);
    const [hoverPosition, setHoverPosition] = useState<LatLonArray>();
    const [startPosition, setStartPosition] = usePersistedState<LatLonArray>(props.myKey + "-start");

    const [isochroneData, setIsochroneData] = useState<any[]>([]);

    if (action === "set-start" && startPosition !== hoverPosition) {
        setStartPosition(hoverPosition!);
    }

    const routeParameters = useDebounce(useMemo(() => {
        return {
            startPosition,
            distanceLimit
        };
    }, [startPosition, distanceLimit]), 1000); // TODO: cancel pending requests?

    useEffect(() => {
        const layer = !!isochroneData.length && new PathLayer({
            id: "deck-" + props.myKey,
            data: isochroneData,
            getPath: d => [[d.longitude, d.latitude], [d.prev_longitude, d.prev_latitude]],
            getColor: d => {
                const r = d.distance / distanceLimit;// / 60.0;
                return [255 * (1 - r), 128 * r, 255 * r, 255];
            },
            getWidth: 30,
            highlightColor: [255, 255, 0, 255],
            autoHighlight: true,
            pickable: true,
        });
        props.setLayers(props.myKey, [layer]);
    }, [isochroneData]);

    const context = useContext(MapContext);
    useEffect(() => {
        const handlers = [
            context.onClick.subscribe((info, e) => {
                setAction(undefined);
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
    }, [action])

    const onStartDragStartPosition = useCallback((event: DragEvent) => {
        setAction("set-start");
    }, []);

    const onDragStartPosition = useCallback((event: DragEvent) => {
        context.onHover.dispatch({
            coordinate: event.lngLat
        } as any /* hacky */, undefined as any /* hacky */)
    }, []);

    const onStopDrag = useCallback((event: DragEvent) => {
        setAction(undefined);
    }, []);

    useEffect(() => {
        if (!startPosition) {
            return;
        }
        console.log("querying isochrone spt");
        (async () => {
            try {
                const elevation = false;
                const result = await getSPT({
                    point: startPosition.join(),
                    vehicle: VehicleProfileId.Bike,
                    elevation,
                    distance_limit: distanceLimit,
                    columns: ["longitude", "latitude", "time", "distance", "prev_longitude", "prev_latitude"].join(","),
                    key: process.env.REACT_APP_GRAPHHOPPER_API_KEY
                }, GRAPHHOPPER_BASE_URI);
                setIsochroneData(result.data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [routeParameters]);


    // console.log("renderiso", props.myKey, props.sidebarElement, startPosition);
    return (
        <React.Fragment>
            {startPosition &&
                <Marker longitude={startPosition[1]} latitude={startPosition[0]}
                    draggable={true}
                    onDrag={onDragStartPosition}
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
                        <Button isSelected={action === "set-start"} onClick={() => setAction("set-start")}>
                            <LocationIcon label="" primaryColor="green" />
                        </Button>
                    </div>
                    <label>Distance limit:</label>
                    <Textfield type="number" defaultValue={distanceLimit} onChange={(e) => setDistanceLimit(parseInt(e.currentTarget.value) || distanceLimit)} />
                </div>
            </SettingsPortal>}

        </React.Fragment >
    )

}

export default IsochroneLayer;