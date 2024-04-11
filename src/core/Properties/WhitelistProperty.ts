import { PropertySettings } from "../PropertySettings";
import { Property } from "../Property";
import { PropertyPerstistenceStrategy } from "../Interfaces/PropertyPerstistenceStrategy";

export class WhitelistProperty extends Property{

    constructor(name:string,fileID:string,dao:PropertyPerstistenceStrategy,settings:PropertySettings){
        super(name,fileID,dao,settings);
    }

    validate(newValue:string):boolean{
        return (this.settings.allowedValues?.indexOf(newValue) != -1)
    }

}
