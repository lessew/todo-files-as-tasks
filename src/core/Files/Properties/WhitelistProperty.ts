import { AbstractProperty } from "../../AbstractProperty";
import { PropertyDAO } from "../../Interfaces/PropertyDAO";

export class WhitelistProperty extends AbstractProperty{
    allowedValues:string[];
    _value:string;

    constructor(name:string,fileID:string,dao:PropertyDAO,vals:string[]){
        super(name,fileID,dao);
        this.allowedValues = vals;
    }

    validate(newValue:string):boolean{
        return (this.allowedValues.indexOf(newValue) != -1)
    }

}
