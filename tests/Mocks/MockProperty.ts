import { Property } from "../../src/core/Property";
import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";
import { PropertySettings } from "src/core/PropertySettings";

export class MockProperty extends Property{
    validatesTo:boolean = true;

    constructor(name:string,fileID:string,dao:PropertyDAO,setting:PropertySettings){
        super(name,fileID,dao,setting);
    }

    setValidatesTo(validates:boolean){
        this.validatesTo = validates
    }

    validate(newValue:string):boolean{
        return this.validatesTo;
    }
}