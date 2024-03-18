import { PropertyDAO } from "./PropertyDAO";

export interface Property{
    name:string;
    dao:PropertyDAO;
    allowedValues?:string[];
    matches(needle:string):boolean;
    getValue():string;
    setValue(val:string):void;
    DEFAULT_VALUE:string;
}