import getNodeName from './getNodeName';
import getDocumentElement from './getDocumentElement';

export default function getParentNode(element: Node | ShadowRoot):  Element {
    if (getNodeName(element) === 'html') {
        return element as Element;
    }
    return (
        // @ts-ignore ts-: this is a quicker (but less type safe) way to save quite some bytes from the bundle
        element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
        element.parentNode || // DOM Element detected
        // @ts-ignore need a better way to handle this...
        element.host || // ShadowRoot detected
        // $@ts-ignore : HTMLElement is a Node
        getDocumentElement(element) // fallback
    );
}
