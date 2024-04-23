import { FileModel } from "../../FileModel";
import { Property } from "../../Property";
import { PropertySettings } from "../../Settings";
import { Whitelist } from "../../Whitelist";
import { WhitelistYAMLProperty } from "./WhitelistYAMLProperty";

export class WhitelistYAMLPropertySettings implements PropertySettings{
    propName:string;
    whitelist:Whitelist;
    defaultValue: string;

    constructor(name:string,defaultValue:string,whitelist:Whitelist){
        if(name.length==0){
            throw new Error(`Propertyname cannot be empty`)
        }
        this.defaultValue = defaultValue;
        this.propName = name;
        this.whitelist = whitelist;
    }

    adaptToProperty(file: FileModel): Property {
        let prop = new WhitelistYAMLProperty(this.propName,this.defaultValue,this.whitelist,file);
        return prop;
    }
}