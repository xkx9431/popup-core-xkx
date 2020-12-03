import type { Modifier } from '../types';
import { modifierPhases } from '../enums';

function order( modifiers: Array<Modifier<any,any>> ){
    const map = new Map();
    const visited = new Set();
    const result:  Array<Modifier<any,any>> = [];

    modifiers.forEach( modifier =>{
        map.set( modifier.name, modifier )
    })

    function sort( modifier:Modifier<any,any> ): void{
        visited.add( modifier.name);

        const requires = [
            ...( modifier.requires || [] ),
            ...( modifier.requiresIfExists || [] ),
        ]

        requires.forEach( dep => {
            if(!visited.has( dep)){
                const depModifier = map.get(dep);

                if(depModifier){
                    sort(depModifier);
                }
            }
        });

        result.push( modifier);
    }

    modifiers.forEach(modifier =>{
        if(!visited.has( modifier.name)){
            sort( modifier );
        }
    } );
    return result;
}


// for different modifiers
export default function orderModifiers(
    modifiers: Array<Modifier<any,any>>
): Array<Modifier<any,any>> {
    // order based on dependencies
    const orderedModifiers = order( modifiers );

    // order based on phase
    return modifierPhases.reduce( ( acc, phase )=>{
        return acc.concat(
            orderedModifiers.filter( modifier => modifier.phase == phase )
        )
    } ,[] )

}