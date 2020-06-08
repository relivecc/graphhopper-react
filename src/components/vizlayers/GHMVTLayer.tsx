
/** @jsx jsx */
import { Button } from '@atlaskit/button/dist/cjs/components/Button';
import Textarea from '@atlaskit/textarea';
import { jsx } from '@emotion/core';
import { Layer, MVTLayer } from 'deck.gl';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { GRAPHHOPPER_BASE_URI } from '../../config';
import MapContext from '../../context/MapContext';
import { useDebounce } from '../../util/useDebounce';
import { usePersistedState } from '../../util/usePersistentState';
import { SettingsPortal } from '../SettingsPortal';
import { DynamicVisualization, evaluateDynamicVisualization } from './DynamicVisualization';

const defaultVis: DynamicVisualization<string, number> = {
    lineWidth: {
        source: "road_class",
        categories: {
            motorway: 30,
            primary: 20,
            trunk: 20,
            secondary: 20,
        },
        default: 10,
    },
    color: {
        source: "road_class",
        categories: {
            motorway: [0xdd, 0x50, 0x4b, 0xff],
            primary: [0xe2, 0xa0, 0x12, 0xff],
            trunk: [0xe2, 0xa0, 0x12, 0xff],
            secondary: [0xf7, 0xc9, 0x13, 0xff],
        },
        default: [0xaa, 0xa5, 0xa7, 0xff],
    }
};

const GHMVTLayer: React.FunctionComponent<{ sidebarElement: Element | undefined, setLayers: (myKey: string, layers: Array<Layer<any> | undefined | false>) => void, myKey: string }> = (props) => {
    const [visualizationSettings, setVisualizationSettings] = usePersistedState(props.myKey + "-vis", defaultVis);

    const parameters = useDebounce(useCallback(() => {
        return {};
    }, [visualizationSettings]), 200); // TODO: cancel pending requests?

    const context = useContext(MapContext);

    useEffect(() => {
        console.log("change layer");
        const details = Object.keys(context.graphHopperInfo?.encoded_values || {}).map(key => "details=" + encodeURIComponent(key)).join("&");
        const layer = new MVTLayer<any>({
            id: "deck-" + props.myKey,
            data: GRAPHHOPPER_BASE_URI + `/mvt/{z}/{x}/{y}.mvt?${details}`,
            minZoom: 0,
            maxZoom: 23,
            getLineColor: (feature: any) => { // [192, 192, 192],
                if (!visualizationSettings.color) {
                    return [255, 0, 0, 255];
                }
                return evaluateDynamicVisualization(visualizationSettings.color, feature.properties)
            },
            getFillColor: [140, 170, 180],
            highlightColor: [255, 0, 0, 255],
            autoHighlight: true,
            pickable: true,
            onHover: (info: any) => console.log(info?.object?.properties),
            getLineWidth: (feature: any) => {
                if (!visualizationSettings.lineWidth) {
                    return 1;
                }
                return evaluateDynamicVisualization(visualizationSettings.lineWidth, feature.properties)
            },
            updateTriggers: {
                // always trigger an update when this effect is called
                getLineWidth: Math.random(),
                getLineColor: Math.random()
            },
            lineWidthMinPixels: 1
        } as any);
        props.setLayers(props.myKey, [layer as any]);
    }, [parameters]);

    const textAreaRef = useRef<any>();

    // console.log("rendermvt", props.myKey, props.sidebarElement);
    return (
        <React.Fragment>
            {props.sidebarElement && <SettingsPortal domNode={props.sidebarElement}>
                <div css={{ width: "300px" }}>

                    <label>Visualization settings:</label>
                    {/* <Textfield type="number" defaultValue={distanceLimit} onChange={(e) => setDistanceLimit(parseInt(e.currentTarget.value) || distanceLimit)} /> */}
                    <Textarea ref={textAreaRef} defaultValue={JSON.stringify(visualizationSettings, undefined, 2)} onChange={(val: any) => {
                        const text = val.target.value;
                        try {
                            setVisualizationSettings(JSON.parse(text));
                        } catch (e) {
                            console.log(e);
                        }
                    }}></Textarea>
                </div>
            </SettingsPortal>}
        </React.Fragment >
    )
}

export default GHMVTLayer;