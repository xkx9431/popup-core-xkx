import  { Placement } from '../enums';
import  { ModifierArguments, Modifier, Rect, Offsets } from '../types';
import getBasePlacement from '../utils/getBasePlacement';
import { top, left, right, placements } from '../enums';

// @ts-ignore
type OffsetsFunction =   ( { // @ts-ignore
    popper: Rect, // @ts-ignore
    reference: Rect,// @ts-ignore
    placement: Placement,// @ts-ignore
}) => [?number, ?number] ;
// @ts-ignore
type Offset = OffsetsFunction | [?number, ?number];

// eslint-disable-next-line import/no-unused-modules
export type Options = {
    offset: Offset,
};

export function distanceAndSkiddingToXY(
    placement: Placement,
    rects: { popper: Rect, reference: Rect },
    offset: Offset
): Offsets {
    const basePlacement = getBasePlacement(placement); // @ts-ignore
    const invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

    let [skidding, distance] =
    typeof offset === 'function'
        ? offset({
            ...rects,
            placement,
        })
        : offset;

    skidding = skidding || 0;
    distance = (distance || 0) * invertDistance;
        // @ts-ignore
    return [left, right].indexOf(basePlacement) >= 0
    ? { x: distance, y: skidding }
    : { x: skidding, y: distance };
}

function offset({ state, options, name }: ModifierArguments<Options>) {
    const { offset = [0, 0] } = options;

    const data = placements.reduce((acc, placement) => { // @ts-ignore
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
    }, {});
    // @ts-ignore
    const { x, y } = data[state.placement];

    if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
    }

    state.modifiersData[name] = data;
}

export type OffsetModifier = Modifier<'offset', Options>;
export default ({
    name: 'offset',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    fn: offset,
} as OffsetModifier);