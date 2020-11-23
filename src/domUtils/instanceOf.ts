import getWindow from './getWindow';

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */

function isElement(node: Node) {
    //@ts-ignore
  const OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */

function isHTMLElement(node: Node | Window ) {
    //@ts-ignore
  const OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

/*:: declare function isShadowRoot(node: mixed): boolean %checks(node instanceof
  ShadowRoot); */

function isShadowRoot(node: Node) {
    //@ts-ignore
  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

export { isElement, isHTMLElement, isShadowRoot };
