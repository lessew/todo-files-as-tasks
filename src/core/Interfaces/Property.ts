import { PropertyDAO } from "./PropertyDAO";

export interface Property{
    name:string;
    dao:PropertyDAO;
    isValidValue:boolean;
    matches(needle:string):boolean;
    getValue():string;
    setValue(val:string):void;
    isEmptyValue():boolean;
}

export interface OptionsProperty extends Property{
    allowedValues:string[];
}
