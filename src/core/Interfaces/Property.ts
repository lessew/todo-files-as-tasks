import { PropertyDAO } from "./PropertyDAO";

export interface Property{
    name:string;
    value:string;
    dao:PropertyDAO;
    matches(needle:string):boolean;
}