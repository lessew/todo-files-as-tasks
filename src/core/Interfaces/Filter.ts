import { FATProperty } from "../FileAsTaskSettings"

export enum FilterOperator {
    include="include",
    exclude="exclude"
}

export type Filter = {
    propertyName:FATProperty,
    propertyValue:string,
    operator:FilterOperator
}