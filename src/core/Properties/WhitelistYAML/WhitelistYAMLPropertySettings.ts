import { FileModel } from "../../FileModel";
import { Property } from "../../Property";
import { PropertySettings } from "../../Settings";
import { Whitelist } from "../../Whitelist";

export class WhitelistYAMLPropertySettings implements PropertySettings{
    propName:string;
    whitelist:Whitelist;
    defaultValue: string;

    constructor(name:string,defaultValue:string,whitelist:Whitelist){
        this.defaultValue = defaultValue;
        this.propName = name;
        this.whitelist = whitelist;
    }

    adaptToProperty(file: FileModel): Property {
        throw new Error("Method not implemented.");
    }
}