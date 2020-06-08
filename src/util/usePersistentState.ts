// inspired by https://dev.to/selbekk/persisting-your-react-state-in-9-lines-of-code-9go

import React, { useEffect } from "react";
import * as lz from "lz-string";

function getStateFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");
    return state ? JSON.parse(lz.decompressFromEncodedURIComponent(state)) : undefined;
}

const globalState = getStateFromUrl() || {};
let timeout: any;

function save() {
    const stringified = JSON.stringify(globalState);
    const compressed = lz.compressToEncodedURIComponent(stringified);
    const param = "?state=" + compressed;
    window.history.pushState({}, "", param);
    //   localStorage.setItem(key, JSON.stringify(state));
    console.log(compressed.length, stringified.length, compressed.length / stringified.length);
}

// export function usePersistedState<T>(key: string, defaultValue?: T) {
//     return React.useState(defaultValue!);
// }

/**
 * React Hook that saves the state as part of the ?state= value in the URL
 * State-save happens after 1 second
 */
export function usePersistedState<T>(key: string, defaultValue?: T) {
    const [state, setState] = React.useState<T>(() => {
        const urlstate = globalState;
        if (urlstate && urlstate[key] !== undefined) {
            return urlstate[key];
        }
        return defaultValue;
    });
    useEffect(() => {
        // const urlstate = getStateFromUrl() || {};
        // urlstate[key] = state;
        globalState[key] = state;

        clearTimeout(timeout);
        timeout = setTimeout(save, 1000);
    }, [key, state]);
    return [state, setState] as [T, React.Dispatch<React.SetStateAction<T>>];
}
