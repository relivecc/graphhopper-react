export const DEFAULT_PALETTE = [
    "#e41a1c",
    "#377eb8",
    "#4daf4a",
    "#984ea3",
    "#ff7f00",
    "#ffff33",
    "#a65628",
    "#f781bf",
    "#999999",
];

export const DEFAULT_PALETTE_ATLASKIT = DEFAULT_PALETTE.map((color) => ({
    label: color,
    value: color,
}));

function hexToRGB(hexColor: number): [number, number, number] {
    return [(hexColor >> 16) & 0xff, (hexColor >> 8) & 0xff, hexColor & 0xff];
}

export function hexStrToRGB(hexColor: string) {
    return hexToRGB(parseInt(hexColor.replace("#", "0x")));
}

export function getCategoryColor(i: number) {
    const color = DEFAULT_PALETTE[i % DEFAULT_PALETTE.length];
    return hexStrToRGB(color);
}
