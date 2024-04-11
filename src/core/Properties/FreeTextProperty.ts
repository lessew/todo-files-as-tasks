import { Property } from "../Property";
import { PropertyPerstistenceStrategy } from "../Interfaces/PropertyPerstistenceStrategy";
import { PropertySettings } from "../PropertySettings";

export class FreeTextProperty extends Property{
    
    constructor(name:string,fileID:string,dao:PropertyPerstistenceStrategy,settings:PropertySettings){
        super(name,fileID,dao,settings);
    }
    
    validate(newVal:string):boolean{
        return true;
    }
}