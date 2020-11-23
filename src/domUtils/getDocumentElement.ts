import { isElement } from './instanceOf';

export default function getDocumentElement(
    element: Element | Window | Node | ShadowRoot
): HTMLElement {
//@ts-ignore
return ((isElement( element) ? element.ownerDocument : element.document) || window.document)
    .documentElement;
}
