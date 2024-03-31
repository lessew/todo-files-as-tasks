import { Property } from "../Property";
import { PropertyDAO } from "../Interfaces/PropertyDAO";
import { PropertySettings } from "../PropertySettings";

export class FreeTextProperty extends Property{
    
    constructor(name:string,fileID:string,dao:PropertyDAO,settings:PropertySettings){
        super(name,fileID,dao,settings);
    }
    
    validate(newVal:string):boolean{
        return true;
    }
}