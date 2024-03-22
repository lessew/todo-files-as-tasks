export enum Filter_Operator {
    include="include",
    exclude="exclude"
}

export type Filter = {
    propertyName:string,
    propertyValue:string,
    operator:Filter_Operator
}