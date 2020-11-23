
export default function getNodeName(element: null| Node | Window): string | null {
    return element ? ((element as Node).nodeName || '').toLowerCase() : null;
}
