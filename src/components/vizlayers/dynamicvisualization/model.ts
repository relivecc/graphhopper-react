export type DynamicVisualization<A extends number | string, B extends number | string> = {
    lineWidth?: DynamicVisualizationSetting<any, A, number>;
    color?: DynamicVisualizationSetting<any, B, [number, number, number, number]>;
};

export type CategoryMatch<
    InputType extends string | number,
    ReturnValueType extends number | number[]
> = {
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
        | { [key in InputType]: ReturnValueType }
        | Array<CategoryMatch<InputType, ReturnValueType>>;
    default: ReturnValueType;
};

type LinearSelector<ReturnValueType extends number | number[]> = {
    function: "linear";
    value: ReturnValueType extends number[] ? ReturnValueType : never;
    denominator: number;
    power?: number;
};

export type DynamicVisualizationSetting<
    InputEncodedValue extends string,
    InputType extends string | number,
    ReturnValueType extends number | number[]
> = {
    source: InputEncodedValue;
} & (
    | CategorySelector<InputType, ReturnValueType>
    | (InputType extends number ? LinearSelector<ReturnValueType> : never)
);
