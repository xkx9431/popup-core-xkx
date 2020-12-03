import type { State, SideObject, Padding } from '../types';
import { Placement, Boundary, RootBoundary, Context, basePlacements } from '../enums';
import getBoundingClientRect from '../domUtils/getBoundingClientRect';
import getClippingRect from '../domUtils/getClippingRect';
import getDocumentElement from '../domUtils/getDocumentElement';
import computeOffsets from './computeOffsets';
import rectToClientRect from './rectToClientRect';
import {
    clippingParents,
    reference,
    popper,
    bottom,
    top,
    right,
    BasePlacement,
    viewport,
} from '../enums'

import { isElement } from '../domUtils/instanceOf';
import mergePaddingObject from './mergePaddingObject';
import expandToHashMap from './expandToHashMap';

export type Options = {
    placement: Placement,
    boundary: Boundary,
    rootBoundary: RootBoundary,
    elementContext: Context,
    altBoundary: boolean,
    padding: Padding,
};


export default function detectOverflow(
    state : State,
    options: Partial<Options> // @ts-ignore
) : SideObject {

    const {
        placement = state.placement,
        boundary = clippingParents,
        rootBoundary = viewport,
        elementContext = popper,
        altBoundary = false,
        padding = 0,
    } = options;
    const paddingObject = mergePaddingObject(
        // @ts-ignore
        typeof padding !== 'number'
        ? padding
        : expandToHashMap(padding, basePlacements )
    )
    const altContext = elementContext === popper ? reference : popper;

    const referenceElement = state.elements.reference;
    const popperRect =  state.rects.popper;
    const element = state.elements[ altBoundary ? altContext : elementContext];

    const clippingClientRect = getClippingRect(
        // @ts-ignore
        isElement(element)
        ? element
        // @ts-ignore
        : element.contextElement || getDocumentElement(state.elements.popper),
        boundary,
        rootBoundary
    );
    const referenceClientRect = getBoundingClientRect(referenceElement);

    const popperOffsets = computeOffsets({
        reference: referenceClientRect,
        element: popperRect,
        strategy: 'absolute',
        placement,
    });

    const popperClientRect = rectToClientRect({
        ...popperRect,
        ...popperOffsets,
    });

    const elementClientRect =
        elementContext === popper ? popperClientRect : referenceClientRect;

    // positive = overflowing the clipping rect
    // 0 or negative = within the clipping rect
    const overflowOffsets = {
        top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
        bottom:
        elementClientRect.bottom -
        clippingClientRect.bottom +
        paddingObject.bottom,
        left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
        right:
        elementClientRect.right - clippingClientRect.right + paddingObject.right,
    };

    const offsetData = state.modifiersData.offset;

    // Offsets can be applied only to the popper element
    if (elementContext === popper && offsetData) {
        //@ts-ignore
        const offset = offsetData[placement ];

        Object.keys(overflowOffsets).forEach((key) => {
        //@ts-ignore
        const multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
        //@ts-ignore
        const axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
        //@ts-ignore
        overflowOffsets[key] += offset[axis] * multiply;
        });
    }

    return overflowOffsets;
}