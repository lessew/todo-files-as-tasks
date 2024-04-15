import { Property } from "../../src/core/Property";
import { PropertyModel } from "../../src/core/Interfaces/PropertyModel";
import { PropertySettings } from "src/core/Interfaces/PropertySettings";

export class MockProperty extends Property{
    validatesTo:boolean = true;

    constructor(name:string,fileID:string,dao:PropertyModel,setting:PropertySettings){
        super(name,fileID,dao,setting);
    }

    setValidatesTo(validates:boolean){
        this.validatesTo = validates
    }

    validate(newValue:string):boolean{
        return this.validatesTo;
    }
}