export type VizLayerType = "route" | "isochrone" | "mvt";

export type VizLayer = {
    type: VizLayerType;
    label: string;
    tabElement?: Element;
};
