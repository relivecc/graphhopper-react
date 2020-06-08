// TODO: tilezen, openmaptiles?

let tfAddition = "";
if (process.env.REACT_APP_THUNDERFOREST_API_KEY)
    tfAddition = "?apikey=" + process.env.THUNDERFOREST_API_KEY;

let mapilionAddition = "";
if (process.env.REACT_APP_MAPILION_API_KEY)
    mapilionAddition = "?key=" + process.env.MAPILION_API_KEY;

let osAPIKey = process.env.REACT_APP_OMNISCALE_API_KEY || "mapsgraph-bf48cc0b";

const osmAttr =
    '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';

// Automatically enable high-DPI tiles if provider and browser support it.
const retinaTiles = window.devicePixelRatio > 1;

var esriAttrMapLink = '<a href="http://www.esri.com/">Esri</a>';
var esriAttrWhoLink =
    "i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community";

// TODO: which of these maps are also available as vector?

// TODO: for TF, can we use json specs? e.g. "https://tile.thunderforest.com/thunderforest.outdoors-v2.json"
const mapstyle = "mapbox://styles/mapbox/light-v9";
export type TileLayerDescription =
    | {
          name: string;
          type: "mapstyle";
          url: string;
      }
    | {
          name: string;
          type: "raster";
          url: string;
          attribution: string;
          maxZoom?: number;
          subdomains?: string[];
      };

export const defaultTileLayers: TileLayerDescription[] = [
    {
        name: "Mapbox Light",
        type: "mapstyle",
        url: "mapbox://styles/mapbox/light-v9",
    },
    {
        type: "raster",
        name: "Esri Aerial",
        url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: "&copy; " + esriAttrMapLink + ", " + esriAttrWhoLink,
        maxZoom: 18,
    },
    {
        type: "raster",
        name: "Lyrk",
        url:
            "https://tiles.lyrk.org/" +
            (retinaTiles ? "lr" : "ls") +
            "/{z}/{x}/{y}?apikey=6e8cfef737a140e2a58c8122aaa26077",
        attribution: osmAttr + ', <a href="https://geodienste.lyrk.de/">Lyrk</a>',
    },
    {
        type: "raster",
        name: "Omniscale",
        // layers: "osm", // used for what?
        url:
            "https://maps.omniscale.net/v2/" +
            osAPIKey +
            "/style.default/{z}/{x}/{y}.png" +
            (retinaTiles ? "?hq=true" : ""),
        attribution: osmAttr + ', &copy; <a href="https://maps.omniscale.com/">Omniscale</a>',
    },
    {
        type: "raster",
        name: "OpenStreetMap",
        subdomains: ["a", "b", "c"],
        url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
        attribution: osmAttr,
    },
    {
        type: "raster",
        name: "TF Transport",
        subdomains: ["a", "b", "c"],
        url: "https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png" + tfAddition,
        attribution:
            osmAttr +
            ', <a href="https://www.thunderforest.com/maps/transport/" target="_blank">Thunderforest Transport</a>',
    },
    {
        type: "raster",
        name: "TF OpenCycleMap",
        subdomains: ["a", "b", "c"],
        url: "https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png" + tfAddition,
        attribution:
            osmAttr +
            ', <a href="https://www.thunderforest.com/maps/opencyclemap/" target="_blank">Thunderforest Cycle</a>',
    },
    {
        type: "raster",
        name: "TF Outdoors",
        subdomains: ["a", "b", "c"],
        url: "https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png" + tfAddition,
        attribution:
            osmAttr +
            ', <a href="https://www.thunderforest.com/maps/outdoors/" target="_blank">Thunderforest Outdoors</a>',
    },
    {
        type: "raster",
        name: "TF Neighbourhood",
        subdomains: ["a", "b", "c"],
        url: "https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png" + tfAddition,
        attribution:
            osmAttr +
            ', <a href="https://www.thunderforest.com/maps/neighbourhood/" target="_blank">Thunderforest Neighbourhood</a>',
    },
    {
        type: "raster",
        name: "Kurviger Liberty",
        url:
            "https://{s}-tiles.mapilion.com/raster/styles/kurviger-liberty/{z}/{x}/{y}" +
            (retinaTiles ? "@2x" : "") +
            ".png" +
            mapilionAddition,
        attribution:
            osmAttr +
            ',&copy; <a href="https://kurviger.de/" target="_blank">Kurviger</a> &copy; <a href="https://mapilion.com/attribution" target="_blank">Mapilion</a> <a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
        subdomains: ["a", "b", "c", "d", "e"],
    },
];

export function getMapStyle(tl: TileLayerDescription) {
    if (tl.type === "mapstyle") {
        return tl.url;
    }

    const tiles = tl.subdomains ? tl.subdomains.map((sub) => tl.url.replace("{s}", sub)) : [tl.url];
    return {
        version: 8,
        sources: {
            "raster-tiles": {
                type: "raster",
                tiles,
                tileSize: 256,
                attribution: tl.attribution,
            },
        },
        layers: [
            {
                id: "simple-tiles",
                type: "raster",
                source: "raster-tiles",
                minzoom: 0,
                maxzoom: tl.maxZoom || 24,
            },
        ],
    };
}
