import { FileModel } from "../../FileModel";
import { Property } from "../../Property";
import { PropertySettings } from "../../Settings";
import { Whitelist } from "../../Whitelist";

export class BooleanYAMLPropertySettings implements PropertySettings{
    propName: string;
    defaultValue: string;
    whitelist:Whitelist

    constructor(name:string,defaultValue:string,whitelist:Whitelist){
        this.defaultValue = defaultValue;
        this.propName = name;
        this.whitelist = whitelist;
    }

    adaptToProperty(file: FileModel): Property {
        throw new Error("Method not implemented.");
    }
}