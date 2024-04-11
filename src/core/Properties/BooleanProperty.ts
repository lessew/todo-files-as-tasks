import { PropertyModel } from "src/core/Interfaces/PropertyModel";
import { WhitelistProperty } from "./WhitelistProperty";
import { PropertySettings } from "../PropertySettings";

export class BooleanProperty extends WhitelistProperty {
    firstValue:string;
    secondValue:string;

    constructor(name:string,fileID:string,dao:PropertyModel,settings:PropertySettings){
        super(name,fileID,dao,settings);
        if(settings.allowedValues?.length!=2){
            throw new Error(`Booleanproperty can only have exactly two values but ${settings.allowedValues?.length} were provided`);
        }
        this.firstValue = settings.allowedValues![0];
        this.secondValue = settings.allowedValues![1];
    }
  
    async toggle():Promise<void>{
        const newValue = (this.getValue()==this.firstValue) ? this.secondValue : this.firstValue;
        await this.setValue(newValue);
    }
   
}