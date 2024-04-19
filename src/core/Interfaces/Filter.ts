import { PropertySettings } from "../FileAsTaskSettings"

export enum FilterOperator {
    include="include",
    exclude="exclude"
}

export type Filter = {
    propertySettings:PropertySettings,
    propertyValue:string,
    operator:FilterOperator
}