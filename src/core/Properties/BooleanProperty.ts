import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";
import { WhitelistProperty } from "./WhitelistProperty";
import { PropertySettings } from "../PropertySettings";

export class BooleanProperty extends WhitelistProperty {
    firstValue:string;
    secondValue:string;

    constructor(name:string,fileID:string,dao:PropertyDAO,settings:PropertySettings){
        super(name,fileID,dao,settings);
        if(settings.allowedValues?.length!=2){
            throw new Error(`Booleanproperty can only have exactly two values but ${settings.allowedValues?.length} were provided`);
        }
        this.firstValue = settings.allowedValues![0];
        this.secondValue = settings.allowedValues![1];
    }
  
    toggle():void{
        const newValue = (this.getValue()==this.firstValue) ? this.secondValue : this.firstValue;
        this.setValue(newValue);
    }
   
}