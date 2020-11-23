


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
// modifiers that need to read the DOM
export const beforeRead: 'beforeRead' = 'beforeRead';
export const read: 'read' = 'read';
export const afterRead: 'afterRead' = 'afterRead';
// pure-logic modifiers
export const beforeMain: 'beforeMain' = 'beforeMain';
export const main: 'main' = 'main';
export const afterMain: 'afterMain' = 'afterMain';
// modifier with the purpose to write to the DOM (or write into a framework state)
export const beforeWrite: 'beforeWrite' = 'beforeWrite';
export const write: 'write' = 'write';
export const afterWrite: 'afterWrite' = 'afterWrite';

//
export const popper: 'popper' = 'popper';
export const reference: 'reference' = 'reference';
export type Context = typeof popper | typeof reference;

export const modifierPhases: Array<ModifierPhases> = [
    beforeRead,
    read,
    afterRead,
    beforeMain,
    main,
    afterMain,
    beforeWrite,
    write,
    afterWrite,
];

export type ModifierPhases =
    | typeof beforeRead
    | typeof read
    | typeof afterRead
    | typeof beforeMain
    | typeof main
    | typeof afterMain
    | typeof beforeWrite
    | typeof write
    | typeof afterWrite;

export const viewport : 'viewport' =  'viewport';
export const clippingParents: 'clippingParents' = 'clippingParents';
export type RootBoundary = typeof viewport | 'document';
export type Boundary =
    | HTMLElement
    | Array<HTMLElement>
    | typeof clippingParents;

export const variationPlacements: Array<VariationPlacement> = basePlacements.reduce(
    (acc: Array<VariationPlacement>, placement: BasePlacement) =>
        acc.concat([`${placement}-${start}` as VariationPlacement, `${placement}-${end}` as VariationPlacement]),
        []
    );

export const placements: Array<Placement> = [...basePlacements, auto].reduce(
    (
        acc: Array<Placement>,
        placement: BasePlacement | typeof auto
    ): Array<Placement> =>
        acc.concat([
        placement,
        `${placement}-${start}`as Placement,
        `${placement}-${end}`as Placement,
        ]),
    []
    );