import  { Placement, ModifierPhases } from './enums';



export type Obj = { [key: string]: any };

export type  hashMapValueType = number | string | boolean;

export type Rect = {
    width:number,
    height:number,
    x:number,
    y:number
}

export type ClientRectObject = {
    x: number,
    y: number,
    top: number,
    left: number,
    right: number,
    bottom: number,
    width: number,
    height: number,
}

export type SideObject = {
    top: number,
    left: number,
    right: number,
    bottom: number,
};

// export type Window = {
//     innerHeight: number,
//     offsetHeight: number,
//     innerWidth: number,
//     offsetWidth: number,
//     pageXOffset: number,
//     pageYOffset: number,
//     getComputedStyle: typeof getComputedStyle,
//     addEventListener(type: any, listener: any, optionsOrUseCapture?: any): void,
//     removeEventListener(
//       type: any,
//       listener: any,
//       optionsOrUseCapture?: any
//     ): void,
//     Element: Element,
//     HTMLElement: HTMLElement,
//     Node: Node,
//     toString(): '[object Window]',
//     devicePixelRatio: number,
//     visualViewport?: VisualViewport,
//     ShadowRoot: ShadowRoot,
//   };

export type VisualViewport = EventTarget & {
    width: number,
    height: number,
    offsetLeft: number,
    offsetTop: number,
    scale: number,
};
export type StateRects = {
    reference: Rect,
    popper: Rect,
};

export type StateOffsets = {
    popper: Offsets,
    arrow?: Offsets,
};
export type VirtualElement= {
    getBoundingClientRect: () => ClientRect | DOMRect,
    contextElement?: Element,
}
export interface State  {
    elements : {
        reference : Element | VirtualElement,
        popper: HTMLElement,
        arrow?: HTMLElement,
    },
    options: OptionsGeneric<any>,
    placement:Placement,
    strategy: PositioningStrategy,
    orderedModifiers: Array<Modifier<any,any>>,
    rects : StateRects,
    scrollParents: {
        reference: Array<Element | Window | VisualViewport>,
        popper: Array<Element | Window | VisualViewport>,
    },
    styles: {
        [key: string]: Partial<CSSStyleDeclaration>,
    },
    attributes: {
        [key: string]: { [key: string]: string | boolean },
    },
    modifiersData: {
        arrow?:{
            x?: number,
            y?: number,
            centerOffset: number,
        },
        hide?:{
            isReferenceHidden : boolean,
            hasPopperEscaped: boolean,
            referenceClippingOffsets:SideObject,
            popperEscapeOffsets: SideObject,
        },
        offset?: Offsets,
        preventOverflow?:Offsets,
        popperOffsets?:Offsets,
        [key:string] : any,
    },
    reset:boolean,
}

export type OptionsGeneric<TModifier> = {
    placement: Placement,
    modifiers: Array<TModifier>,
    strategy: PositioningStrategy,
    onFirstUpdate?: (state:Partial<State>) => void,
};

interface Instance {
    state : State,
    destroy: ()=> void,
    forceUpdate: ()=>void,
    update: () =>Promise<Partial<State>>,
    setOptions:( option:Partial<OptionsGeneric<any>> ) =>Promise<Partial<State>>,
};

// export type StrictModifiers =
//   | Partial<OffsetModifier>
//   | Partial<ApplyStylesModifier>
//   | Partial<ArrowModifier>
//   | Partial<HideModifier>
//   | Partial<ComputeStylesModifier>
//   | Partial<EventListenersModifier>
//   | Partial<FlipModifier>
//   | Partial<PreventOverflowModifier>
//   | Partial<PopperOffsetsModifier>;


export type Options = {
    placement: Placement,
    modifiers: Array<Partial<Modifier<any, any>>>,
    strategy: PositioningStrategy,
    onFirstUpdate?:(state: Partial<State>) => void,
};

export type ModifierArguments<Options extends Obj> = {
    state: State,
    instance: Instance,
    options: Partial<Options>,
    name: string,
};

export type Offsets = {
    y: number,
    x: number,
};

export type PositioningStrategy = 'absolute' | 'fixed';

type modifierFn =  (modifierArguments: ModifierArguments<Options>)  => State ;
export interface Modifier<Name, Options> {
    name: Name,
    enabled: boolean,
    phase: ModifierPhases,
    requires?: Array<string>,
    requiresIfExists?: Array<string>,
    fn: modifierFn | void,
    effect?: (modifierArguments:ModifierArguments<Options>) => (() => void) | void,
    options?: Partial<Options>,
    data?: Obj,
};