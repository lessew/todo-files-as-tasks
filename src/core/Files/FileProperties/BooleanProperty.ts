import { FileProperty } from "../FileProperty";
import { WhitelistProperty } from "./WhiteListProperty";

export class BooleanProperty extends WhitelistProperty {
    
    override setAllowedValues(vals:string[]):FileProperty{
        if(vals.length!=2){
            throw Error("This property only accepts exactly 2 allowed values");
        }
        this.allowedValues = vals;
        return this;
    }

    matches(needle:string):boolean{
        if(this.value!==undefined){
            return this.value.startsWith(needle);
        }
        return false;
    }

    toggle():string{
        if(this.allowedValues.length!=2){
            throw "Error: more or less than 2 allowed values";
        }
        this.value = (this.value==this.allowedValues[0]) ? this.allowedValues[1] : this.allowedValues[0];
        return this.value;
    }
   
}