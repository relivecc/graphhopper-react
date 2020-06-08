import { DeckProps } from "@deck.gl/core/lib/deck";
import { GraphHopperInfo } from "@relive/graphhopper-api-client/build/experimentalAPI";
import React from "react";
import EventEmitter from "../util/EventEmitter";

type MapContextType = {
    onClick: EventEmitter<Required<DeckProps>["onClick"]>;
    onHover: EventEmitter<Required<DeckProps>["onHover"]>;
    onActionChange: EventEmitter<
        (action: "set-start" | "set-end" | undefined, source: string) => void
    >;
    graphHopperInfo?: GraphHopperInfo;
};

export const createDefaultMapContext: () => MapContextType = () => ({
    onClick: new EventEmitter(),
    onHover: new EventEmitter(),
    onActionChange: new EventEmitter(),
    graphHopperInfo: undefined,
});

const MapContext = React.createContext<MapContextType>(createDefaultMapContext());

export default MapContext;
