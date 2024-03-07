import { AbstractFileProperty,FileProperty } from "../FileProperty";

export class WhitelistProperty extends AbstractFileProperty{
    allowedValues:string[];
    value:string;

    matches(needle:string):boolean{
        if(this.value!==undefined){
            return this.value.startsWith(needle);
        }
        return false;
    }
    setAllowedValues(vals:string[]):FileProperty{
        this.allowedValues = vals;
        return this;
    }
}
