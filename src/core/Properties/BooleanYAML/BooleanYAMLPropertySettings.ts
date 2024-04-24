import { FileModel } from "../../FileModel";
import { Property } from "../../Property";
import { PropertySettings } from "../../Settings";
import { Whitelist } from "../../Whitelist";
import { BooleanYAMLProperty } from "./BooleanYAMLProperty";

export class BooleanYAMLPropertySettings implements PropertySettings{
    propName: string;
    defaultValue: string;
    whitelist:Whitelist

    constructor(name:string,defaultValue:string,whitelist:Whitelist){
        if(whitelist.size()!=2){
            throw new Error(`Boolean property must have exactly 2 values but instead found ${whitelist.size()}`);
        }
        this.defaultValue = defaultValue;
        this.propName = name;
        this.whitelist = whitelist;
    }

    adaptToProperty(file: FileModel): Property {
        let prop = new BooleanYAMLProperty(this.propName,this.defaultValue,this.whitelist,file);
        return prop;
    }
}