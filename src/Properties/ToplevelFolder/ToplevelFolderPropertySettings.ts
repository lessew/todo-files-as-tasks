import { FileModel } from "src/FileSystem/File";
import { Property } from "../Property";
import { PropertySettings, PropertyType } from "../PropertySettings";
import { Whitelist } from "../Whitelist";
import { ToplevelFolderProperty } from "./ToplevelFolderProperty";

export class ToplevelFolderPropertySettings implements PropertySettings {
    propName: string;
    whitelist:Whitelist;
    defaultValue:string;

    constructor(n:string){
        if(n.length==0){
            throw new Error("can't have toplevelfolder property with empty title");
        }
        this.propName = n;
    }

    setProjects(wl:Whitelist):ToplevelFolderPropertySettings{
        this.whitelist = wl;
        return this;
    }
    
    setDefaultValue(v:string):ToplevelFolderPropertySettings{
        this.defaultValue = v;
        return this;
    }

    adaptToProperty(file: FileModel): Property {
        if(this.defaultValue==undefined){
            throw new Error(`Error: default value for toplevelfolder ${this.propName} is not set`)
        }
        if(this.whitelist==undefined){
            throw new Error(`Error: whitelist for toplevelfolder ${this.propName} is not set`)
        }
        let prop = new ToplevelFolderProperty(this.defaultValue,this.whitelist,file);
        return prop;
    }

    
    getType():PropertyType{
        return "toplevelfolder"
    }
}
