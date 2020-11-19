import  { Modifier } from '../types';
// modifiers: Array< Partial<Modifier<string, object>> >
export default function mergeByName( modifiers: Array< Partial<Modifier<string, object>> > ){
    const merged = modifiers.reduce((merged, current) => {
        const existing = merged.get(current.name);
        merged.set(current.name, existing ? {
            ...existing,
            ...current,
            options: { ...existing.options, ...current.options },
            data: { ...existing.data, ...current.data },
        } : current );
        return merged;
    }, new Map());

      // IE11 does not support Object.values
    return Object.keys(merged).map(key => merged.get( key ) );
}