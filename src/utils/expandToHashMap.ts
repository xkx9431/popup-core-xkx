
export default function expandToHashMap <
    T extends number | string | boolean,
    K extends string | number
    > (value: T, keys: Array<K> ): Map<K,T> {
    return keys.reduce( (hashMap, key) => {
        hashMap.set( key,value) ;
        return hashMap;
    }, new Map<K,T>() );
}