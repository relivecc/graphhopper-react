
/** @jsx jsx */
import { AtlassianNavigation } from "@atlaskit/atlassian-navigation";
import { ButtonItem, MenuGroup, Section } from '@atlaskit/menu';
import { Content, LeftSidebarWithoutResize, Main, PageLayout } from '@atlaskit/page-layout';
import Tabs from '@atlaskit/tabs';
import { TabData } from '@atlaskit/tabs/types';
import { jsx } from '@emotion/core';
import { getInfo } from "@relive/graphhopper-api-client/build/experimentalAPI";
import DeckGL, { Layer } from 'deck.gl';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StaticMap, _MapContext } from 'react-map-gl';
import './App.css';
import PrimaryDropdown from './components/menu/PrimaryDropdown';
import { defaultTileLayers, getMapStyle } from './components/tilelayers';
import GHIsochroneLayer from './components/vizlayers/GHIsochroneLayer';
import GHMVTLayer from './components/vizlayers/GHMVTLayer';
import GHRouteLayer from './components/vizlayers/GHRouteLayer';
import { VizLayer, VizLayerType } from './components/vizlayers/VizLayer';
import { GRAPHHOPPER_BASE_URI } from "./config";
import MapContext, { createDefaultMapContext } from './context/MapContext';
import { assertUnreachable } from './util/typescript';
import { usePersistedState } from "./util/usePersistentState";

const INITIAL_VIEW_STATE = {
  latitude: 51.923390,
  longitude: 4.467195,
  zoom: 9,
  bearing: 0,
  pitch: 0
};

const ProductHome = () => (
  // <ProductHome icon={AtlassianIcon} logo={AtlassianLogo} />
  <div></div>
);

const ProjectsContent = (props: { setMapStyle: (style: any) => void }) => (
  <MenuGroup>
    <Section hasSeparator title="Vector">
      {
        defaultTileLayers.filter(a => a.type === "mapstyle").map(a => (
          <ButtonItem key={a.name} onClick={() => props.setMapStyle(getMapStyle(a))}>{a.name}</ButtonItem>
        ))
      }
    </Section>
    <Section title="Raster">
      {
        defaultTileLayers.filter(a => a.type === "raster").map(a => (
          <ButtonItem key={a.name} onClick={() => props.setMapStyle(getMapStyle(a))}>{a.name}</ButtonItem>
        ))
      }
    </Section>

  </MenuGroup>
);

const context = createDefaultMapContext();

function App() {
  const [viewState, setViewState] = usePersistedState("viewstate", INITIAL_VIEW_STATE);
  const [vizLayers, setVizLayers] = usePersistedState<VizLayer[]>("viz", [{
    type: "route",
    label: "Route"
  }]);
  const [mapStyle, setMapStyle] = useState(getMapStyle(defaultTileLayers[0]));
  const layers = useRef(new Map<string, Layer<any>[]>());
  const [deckGLLayers, setDeckGLLayers] = useState<Layer<any>[]>();


  const onViewStateChange = useCallback(({ viewState }: { viewState: any }) => setViewState(viewState), []);

  useEffect(() => {
    (async () => {
      try {
        const info = await getInfo({ key: process.env.REACT_APP_GRAPHHOPPER_API_KEY }, GRAPHHOPPER_BASE_URI);
        context.graphHopperInfo = info.data;
        console.log(info.data.encoded_values);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  const addOverlay = useCallback((type: VizLayerType) => {
    setVizLayers([...vizLayers, {
      type,
      label: type + " (" + (vizLayers.length + 1) + ")"
    }])
  }, [vizLayers]);

  const [sidebar, setSidebar] = useState<Element | null>();
  const sidebarRef = useCallback((node: Element | null) => {
    setSidebar(node)
  }, []);


  const setLayers = useCallback((key: string, deckLayers: Array<Layer<any> | undefined | false>) => {
    layers.current.set(key, deckLayers.filter(d => d) as Layer<any>[]);
    setDeckGLLayers(Array.from(layers.current.values()).flat());
  }, []);

  const [tabRefs, setTabRefs] = useState<Array<Element | undefined>>([]);
  const [tabs, setTabs] = useState<TabData[]>([]);

  const D = DeckGL as any;

  useEffect(() => {
    const tabs = vizLayers.map((vl: VizLayer, i) => ({
      label: vl.label,
      content: <div key={"tab" + i} css={{ padding: "20px 0" }} ref={(r) => {
        console.log("setref")
        tabRefs[i] = r || undefined;
        setTabRefs([...tabRefs]);
      }}></div>
    }));
    setTabs(tabs);
  }, [vizLayers]);

  const OverlaysContent = (props: any) => <MenuGroup>
    <Section title="Overlays">
      <ButtonItem onClick={() => addOverlay("route")}>Add route overlay</ButtonItem>
      <ButtonItem onClick={() => addOverlay("isochrone")}>Add isochrone overlay</ButtonItem>
      <ButtonItem onClick={() => addOverlay("mvt")}>Add MVT overlay</ButtonItem>
    </Section>
  </MenuGroup>;

  return (
    <React.Fragment>
      <AtlassianNavigation label="hello" primaryItems={
        [
          <PrimaryDropdown content={() => <ProjectsContent setMapStyle={setMapStyle} />} text="Background layer" />,
          <PrimaryDropdown content={OverlaysContent} text="Overlays" />,
        ]
      } renderProductHome={ProductHome}></AtlassianNavigation>
      <PageLayout>

        <Content testId="content" css={{ height: "100%" }}>
          <LeftSidebarWithoutResize
            testId="leftSidebar"
            width={350}
          >
            <div css={{ minWidth: 50, padding: '10px 10px' }} ref={sidebarRef}>
              <Tabs tabs={tabs}></Tabs>
            </div>
          </LeftSidebarWithoutResize>
          <Main testId="main" css={{ height: "100%" }}>
            <MapContext.Provider value={context}>
              <D
                width={undefined as any}
                height={undefined as any}
                effects={[]}
                style={{ position: "relative" }}
                // initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={deckGLLayers}
                onHover={context.onHover.dispatch}
                onClick={context.onClick.dispatch}
                ContextProvider={_MapContext.Provider}
                viewState={viewState}
                onViewStateChange={onViewStateChange}
              >
                <StaticMap
                  width={undefined as any}
                  height={undefined as any}
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                  mapStyle={mapStyle}
                // TODO: fix mapOptions={{ maxZoom: (mapStyle as any).layers ? (mapStyle as any).layers[0].maxZoom : undefined }}
                >

                </StaticMap>
                {vizLayers.map((vl, i) => {
                  const tabRef = tabRefs[i];
                  switch (vl.type) {
                    case "route":
                      return <GHRouteLayer key={vl.label} sidebarElement={tabRef} setLayers={setLayers} myKey={vl.label} ></GHRouteLayer>
                    case "isochrone":
                      return <GHIsochroneLayer key={vl.label} sidebarElement={tabRef} setLayers={setLayers} myKey={vl.label} ></GHIsochroneLayer>
                    case "mvt":
                      return <GHMVTLayer key={vl.label} sidebarElement={tabRef} setLayers={setLayers} myKey={vl.label} ></GHMVTLayer>
                    default:
                      assertUnreachable(vl.type);
                  }
                })}
              </D>
            </MapContext.Provider>
          </Main>
        </Content>
      </PageLayout>
    </React.Fragment >
  );
}

export default App;
