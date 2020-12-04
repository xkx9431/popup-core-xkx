import  { Modifier, ModifierArguments } from '../types';
import getNodeName from '../domUtils/getNodeName';
import { isHTMLElement } from '../domUtils/instanceOf';

// This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles( { state} : ModifierArguments< {}>){
    Object.keys( state.elements).forEach( name => {
        const style = state.styles[name] || {};
        const attributes = state.attributes[ name ] || {};
        //@ts-ignore
        const element = state.elements[name];

        // arrow is optional + virtual elements
        if (!isHTMLElement(element) || !getNodeName(element)) {
            return;
        }

        Object.assign(element.style, style);
        Object.keys(attributes).forEach(name => {
            const value = attributes[name];
            if (value === false) {
                element.removeAttribute(name);
            } else {
                element.setAttribute(name, value === true ? '' : value);
            }
        });
    });
}

export type ApplyStylesModifier = Modifier<'applyStyles', {}>;
export default ({
    name: 'applyStyles',
    enabled: true,
    phase: 'write',
    fn: applyStyles,
    // @ts-ignore
    effect,
    requires: ['computeStyles'],
} as  ApplyStylesModifier );