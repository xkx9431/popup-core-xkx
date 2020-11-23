export default function getWindow(node: Node | Window): Window {
    if (node.toString() !== '[object Window]') {
        const ownerDocument = (node as Node).ownerDocument;
        return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    return node as Window ;
}