export default function within( min:number, max:number,value:number): number {
    return Math.max( min, Math.min( value, max ));
}