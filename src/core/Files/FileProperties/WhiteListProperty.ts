import { AbstractFileProperty,FileProperty } from "../FileProperty";

export class WhitelistProperty extends AbstractFileProperty{
    allowedValues:string[];
    _value:string;

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

    get value():string{
        if(typeof this._value !== "string"){
            this._value = this.dao.retrieve();
        }
        return this._value;
    }

    set value(val:string){
        if(this.allowedValues.includes(val)){
            this.dao.persist(val);
            this._value = val;
        }
        else{
            this._value = WhitelistProperty.INVALID_VALUE;
        }
    }
}
