import { PropertyDAO } from "./PropertyDAO";

export interface Property{
    name:string;
    dao:PropertyDAO;
    matches(needle:string):boolean;
    getValue():string;
    setValue(val:string):void;
}