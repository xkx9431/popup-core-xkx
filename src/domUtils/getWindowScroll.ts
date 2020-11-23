import getWindow from './getWindow';

export default function getWindowScroll(node: Node | Window) {
    const win: Window = getWindow(node );
    const scrollLeft = win.pageXOffset;
    const scrollTop = win.pageYOffset;

    return {
        scrollLeft,
        scrollTop,
    };
}
