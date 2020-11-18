export default function format(str:string,...args: Array<string>):string {
    return [...args].reduce( (p,c) => p.replace(/%s/, c),  str );
}