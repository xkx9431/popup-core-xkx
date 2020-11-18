export enum altAxis {
    x ,
    y
}

export const top: 'top' = 'top';
export const bottom: 'bottom' = 'bottom';
export const right: 'right' = 'right';
export const left: 'left' = 'left';
export const auto: 'auto' = 'auto';

export type BasePlacement =
| typeof top
| typeof bottom
| typeof right
| typeof left;

export const basePlacements : Array< BasePlacement> = [ top, bottom, right, left];

export const start: 'start' = 'start';
export const end: 'end' = 'end';
export type Variation = typeof start | typeof end;

export type VariationPlacement =
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
export type AutoPlacement = 'auto' | 'auto-start' | 'auto-end';
export type ComputedPlacement = VariationPlacement | BasePlacement;
export type Placement = AutoPlacement | BasePlacement | VariationPlacement;