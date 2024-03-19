import { PropertyDAO } from "./PropertyDAO";

export interface Property{
    name:string;
    dao:PropertyDAO;
    loadedValueIsValid():boolean;
    matches(needle:string):boolean;
    getValue():string;
    setValue(val:string):void;
    isEmptyValue():boolean;
}

export interface OptionsProperty extends Property{
    allowedValues:string[];
}
