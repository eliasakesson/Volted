export function Stringify(json){
    return JSON.stringify(json).replace(/\"/g, "")
}