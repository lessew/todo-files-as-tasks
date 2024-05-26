import { File } from "../../FileSystem/File";
import { Property } from "../Property";
import { PropertySettings, PropertyType } from "../PropertySettings";
import { Whitelist } from "../Whitelist";
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

    adaptToProperty(file: File): Property {
        let prop = new WhitelistYAMLProperty(this.propName,this.defaultValue,this.whitelist,file);
        return prop;
    }

    
    getType():PropertyType{
        return "whitelistYAML"
    }
}