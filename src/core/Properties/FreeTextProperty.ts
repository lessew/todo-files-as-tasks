import { Property } from "../Property";
import { PropertyModel } from "../Interfaces/PropertyModel";
import { PropertySettings } from "../PropertySettings";

export class FreeTextProperty extends Property{
    
    constructor(name:string,fileID:string,dao:PropertyModel,settings:PropertySettings){
        super(name,fileID,dao,settings);
    }
    
    validate(newVal:string):boolean{
        return true;
    }
}