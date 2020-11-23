import getWindow from './getWindow';

export default function getComputedStyle(
    element: Element
    ): CSSStyleDeclaration {
    return (getWindow(element) as Window ).getComputedStyle(element);
}