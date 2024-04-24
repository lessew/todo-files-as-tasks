import { Whitelist } from "./Whitelist";

export enum FilterOperator {
    include="include",
    exclude="exclude"
}

export class Filter {
    propertyName:string;
    whitelist?:Whitelist;
    propertyValue:string;
    operator:FilterOperator;

    constructor(propertyName:string,propertyValue:string,op:FilterOperator){
        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
        this.operator = op;
        return this;
    }

    setWhitelist(wl:Whitelist):Filter{
        this.whitelist = wl;
        return this;
    }
}