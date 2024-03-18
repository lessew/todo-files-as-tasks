import { AbstractProperty } from "../AbstractProperty";
import { PropertyDAO } from "../Interfaces/PropertyDAO";

export class StringProperty extends AbstractProperty {
    
    constructor(name:string,fileID:string,default_value:string,dao:PropertyDAO){
        super(name,fileID,default_value,dao);
    }
    
    validate(newVal:string):boolean{
        return true;
    }
}