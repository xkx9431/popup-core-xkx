import {  Variation,  Placement } from '../enums';

export default function getVariation(placement: Placement): Variation | undefined {
    const [ , variation ] = placement.split('-');
    return variation ? variation as Variation : undefined;
}
