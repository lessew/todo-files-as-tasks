import { ContextValues, StatusValues } from "./FileProperties";
import { Query } from "./Query";

export abstract class Parser{
    contextValues:ContextValues;
    statusValues:StatusValues;

    constructor(c:ContextValues,s:StatusValues){
        this.contextValues = c;
        this.statusValues = s;
    }
    abstract parse(source:string):Query;
}