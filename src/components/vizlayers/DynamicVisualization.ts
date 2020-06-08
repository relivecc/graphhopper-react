import { assertUnreachable } from "../../util/typescript";

export type DynamicVisualization<A extends number | string, B extends number | string> = {
    lineWidth?: DynamicVisualizationSetting<A, number>;
    color?: DynamicVisualizationSetting<B, [number, number, number, number]>;
};

/**
 * A small DSL for visualizing MVT layers based on a JSON template
 *
 * TODO: document / add examples
 */
export function evaluateDynamicVisualization<A extends number | string, B extends any>(
    setting: DynamicVisualizationSetting<A, B>,
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
                    value,
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

type CategoryMatch<InputType extends string | number, ReturnValueType extends number | number[]> = {
    match:
        | { eq: InputType }
        | (InputType extends number
              ?
                    | {
                          lt: InputType;
                      }
                    | { gt: InputType }
              : never);

    value: ReturnValueType;
};

type CategorySelector<
    InputType extends string | number,
    ReturnValueType extends number | number[]
> = {
    function?: "category"; // default
    categories:
        | { [key: string]: ReturnValueType }
        | Array<CategoryMatch<InputType, ReturnValueType>>;
    default: ReturnValueType;
};

type LinearSelector<ReturnValueType extends number | number[]> = {
    function: "linear";
    value: ReturnValueType extends number[] ? ReturnValueType : never;
    denominator: number;
    power?: number;
};

type DynamicVisualizationSetting<
    InputType extends string | number,
    ReturnValueType extends number | number[]
> = {
    source: string;
} & (
    | CategorySelector<InputType, ReturnValueType>
    | (InputType extends number ? LinearSelector<ReturnValueType> : never)
);
