import { ValidContextValues, ValidStatusValues } from "./FilePropertyValues";
import { Query } from "./Query";

export abstract class Parser{
    contextValues:ValidContextValues;
    statusValues:ValidStatusValues;

    constructor(c:ValidContextValues,s:ValidStatusValues){
        this.contextValues = c;
        this.statusValues = s;
    }
    abstract parse(source:string):Query;
}