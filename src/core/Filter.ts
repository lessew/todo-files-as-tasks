import { PropertySettings } from "./Property";

export enum FilterOperator {
    include="include",
    exclude="exclude"
}

export class Filter {
    propertySettings:PropertySettings;
    propertyValue:string;
    operator:FilterOperator;

    constructor(settings:PropertySettings,val:string,op:FilterOperator){
        this.propertySettings = settings;
        this.propertyValue = val;
        this.operator = op;
    }
}