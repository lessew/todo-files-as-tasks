import { AbstractProperty } from "../AbstractProperty";
import { PropertyDAO } from "../Interfaces/PropertyDAO";

export class FreeTextProperty extends AbstractProperty{
    
    constructor(name:string,fileID:string,dao:PropertyDAO){
        super(name,fileID,dao);
    }
    
    validate(newVal:string):boolean{
        return true;
    }
}