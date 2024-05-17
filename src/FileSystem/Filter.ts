
export enum FilterOperator {
    include="include",
    exclude="exclude"
}

export class Filter {
    propertyName:string;
    propertyValue:string;
    operator:FilterOperator;

    constructor(propertyName:string,propertyValue:string,op:FilterOperator){
        this.propertyName = propertyName;
        this.propertyValue = propertyValue;
        this.operator = op;
        return this;
    }
}