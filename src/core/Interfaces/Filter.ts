export enum FilterOperator {
    include="include",
    exclude="exclude"
}

export type Filter = {
    propertyName:string,
    propertyValue:string,
    operator:FilterOperator
}