import { AbstractProperty } from "../../src/core/AbstractProperty";
import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";

export class MockAbstractProperty extends AbstractProperty{
    validatesTo:boolean = true;

    constructor(name:string,fileID:string,dao:PropertyDAO){
        super(name,fileID,dao);
    }

    setValidatesTo(validates:boolean){
        this.validatesTo = validates
    }

    validate(newValue:string):boolean{
        return this.validatesTo;
    }
}