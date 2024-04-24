import { FileModel } from "src/core/FileModel";
import { BaseNameProperty } from "src/core/Properties/BasenameProperty";
import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAMLProperty";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolder/ToplevelFolderProperty";
import { WhitelistYAMLProperty } from "src/core/Properties/WhitelistYAMLProperty";
import { Property } from "src/core/Interfaces/Property";
import { PropertySettings } from "src/core/Settings";
import { Whitelist } from "src/core/Whitelist";

type PropertyType = "basename" | "toplevelfolder" | "booleanyaml" | "whitelistyaml";


export class PropertyFactory{
    propertyType:PropertyType;
    file:FileModel

    constructor(typ: PropertyType,file:FileModel ){
        this.propertyType = typ;
        return this;
    }

    load(propSettings:PropertySettings):Property{
        switch(this.propertyType){
            case "basename": {
                return this.loadBasenameProperty(this.file);
            }
            case "toplevelfolder":{
                return this.loadToplevelFolderProperty(propSettings,this.file);
            }
            case "booleanyaml":{
                return this.loadBooleanYAMLProperty();
            }
            case "whitelistyaml":{
                return this.loadWhitelistYAMLProperty(propSettings);
            }
        }
    }

    loadBasenameProperty(file:FileModel):BaseNameProperty{
        return new BaseNameProperty(file);
    }

    loadToplevelFolderProperty(propsettings:PropertySettings,file:FileModel):ToplevelFolderProperty{
        return new ToplevelFolderProperty(propsettings.defaultValue,propsettings.whitelist!,file);
    }

    loadWhitelistYAMLProperty(propSettings:PropertySettings):WhitelistYAMLProperty{
        return new WhitelistYAMLProperty("","",new Whitelist([]),this.file);
    }

    loadBooleanYAMLProperty():BooleanYAMLProperty{
        return new BooleanYAMLProperty("","",new Whitelist([]),this.file);
    }

}