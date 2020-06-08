import { assertUnreachable } from "../../../util/typescript";
import { DynamicVisualizationSetting, CategoryMatch } from "./model";

/**
 * A small DSL for visualizing MVT layers based on a JSON template
 *
 * TODO: document / add examples
 */
export function evaluateDynamicVisualization<A extends number | string, B extends any>(
    setting: DynamicVisualizationSetting<string, A, B>,
    input: any
) {
    const inputValue = input[setting.source] as A;

    if (!setting.function || setting.function === "category") {
        let expandedCategories: Array<CategoryMatch<A, B>> | undefined;
        if (!Array.isArray(setting.categories)) {
            expandedCategories = Object.entries(setting.categories).map(([key, value]) => {
                const match: CategoryMatch<A, B> = {
                    match: {
                        eq: key as any, // TODO: not sure why types break
                    },
                    value: value as any, // TODO: not sure why types break
                };
                return match;
            });
        } else {
            expandedCategories = setting.categories;
        }

        for (let category of expandedCategories) {
            if ("eq" in category.match && category.match.eq === inputValue) {
                return category.value;
            }

            if ("lt" in category.match && inputValue < (category.match as any).lt) {
                // TODO: remove "any"
                return category.value;
            }

            if ("gt" in category.match && inputValue > (category.match as any).gt) {
                // TODO: remove "any"
                return category.value;
            }
        }

        return setting.default;
    }

    if (setting.function === "linear") {
        if (typeof inputValue !== "number") {
            throw new Error("can't execute linear on non-number");
        }

        let val = inputValue / setting.denominator;

        if (setting.power) {
            val = Math.pow(val, setting.power);
        }

        if (setting.value) {
            // A bit hacky, but if passed [255,-1,255,255] we replace the -1
            return (setting.value as number[]).map((a) => (a === -1 ? val * 255 : a));
        }
        return val;
    }
    assertUnreachable(setting.function);
}
