import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";
import { WhitelistProperty } from "./WhitelistProperty";

export class BooleanProperty extends WhitelistProperty {
    
    constructor(name:string,fileID:string,dao:PropertyDAO,vals:string[]){
        super(name,fileID,dao,vals);
        if(vals.length!=2){
            throw new Error(`Booleanproperty can only have exactly two values but ${vals.length} were provided`);
        }
    }
  
    toggle():void{
        const newValue = (this.getValue()==this.allowedValues[0]) ? this.allowedValues[1] : this.allowedValues[0];
        this.setValue(newValue);
    }
   
}