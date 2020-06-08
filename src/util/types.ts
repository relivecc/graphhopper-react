export type LatLon = {
    lat: number;
    lon: number;
};

export type LatLonArray = number[];

export function latLonToString(latLon: LatLonArray | undefined) {
    return latLon?.map((c) => c.toFixed(6)).join();
}
