import { writeFileSync } from "fs";

const encodedValues = {
    road_class: [
        "other",
        "motorway",
        "trunk",
        "primary",
        "secondary",
        "tertiary",
        "residential",
        "unclassified",
        "service",
        "road",
        "track",
        "bridleway",
        "steps",
        "cycleway",
        "path",
        "living_street",
        "footway",
        "pedestrian",
        "platform",
        "corridor",
    ],
    road_class_link: ["true", "false"],
    road_environment: ["other", "road", "ferry", "tunnel", "bridge", "ford", "shuttle_train"],
    max_speed: [">number", "<number"],
    road_access: [
        "yes",
        "destination",
        "customers",
        "delivery",
        "forestry",
        "agricultural",
        "private",
        "other",
        "no",
    ],
    surface: [
        "other",
        "paved",
        "asphalt",
        "concrete",
        "paving_stones",
        "cobblestone",
        "unpaved",
        "compacted",
        "fine_gravel",
        "gravel",
        "ground",
        "dirt",
        "grass",
        "sand",
    ],
    toll: ["no", "all", "hgv"],
    track_type: ["other", "grade1", "grade2", "grade3", "grade4", "grade5"],
    roundabout: ["true", "false"],
    bike_network: ["other", "international", "national", "regional", "local"],
    get_off_bike: ["true", "false"],
    foot_network: ["other", "international", "national", "regional", "local"],
};

// export type Settings = {
//     lineWidth?:
//         | DynamicVisualizationSetting<"toll", "no" | "all" | "hgv" | "*", number>
//         | DynamicVisualizationSetting<"max_speed", number, number>;
//     color?:
//         | DynamicVisualizationSetting<
//               "toll",
//               "no" | "all" | "hgv" | "*",
//               [number, number, number, number]
//           >
//         | DynamicVisualizationSetting<"max_speed", number, [number, number, number, number]>;
// };

export function generateSettingsType() {
    const lineWidthTypes = [];
    const colorTypes = [];
    for (const [key, value] of Object.entries(encodedValues)) {
        if (value[0] === ">number") {
            lineWidthTypes.push(`DynamicVisualizationSetting<"${key}", number, number>`);
            colorTypes.push(
                `DynamicVisualizationSetting<"${key}", number, [number, number, number, number]>`
            );
        } else {
            lineWidthTypes.push(
                `DynamicVisualizationSetting<"${key}", ${value
                    .map((v) => `"${v}"`)
                    .join(" | ")}, number>`
            );
            colorTypes.push(
                `DynamicVisualizationSetting<"${key}", ${value
                    .map((v) => `"${v}"`)
                    .join(" | ")}, [number, number, number, number]>`
            );
        }
    }
    const code = `
    import { DynamicVisualizationSetting } from "../src/components/vizlayers/dynamicvisualization/model";
    
    export type Settings = {
        lineWidth?:
            | ${lineWidthTypes.join(" | ")};
        color?:
        | ${colorTypes.join(" | ")};
    };`;

    writeFileSync("Settings.ts", code);
}

generateSettingsType();
