import { AbstractProperty } from "../AbstractProperty";
import { PropertyDAO } from "../Interfaces/PropertyDAO";

export class WhitelistProperty extends AbstractProperty{
    allowedValues:string[];

    constructor(name:string,fileID:string,default_value:string,dao:PropertyDAO,vals:string[]){
        super(name,fileID,default_value,dao);
        this.allowedValues = vals;
    }

    validate(newValue:string):boolean{
        return (this.allowedValues.indexOf(newValue) != -1)
    }

}
