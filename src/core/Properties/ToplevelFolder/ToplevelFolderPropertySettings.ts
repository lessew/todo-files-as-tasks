import { FileModel } from "src/core/FileModel";
import { Property } from "src/core/Property";
import { PropertySettings } from "src/core/Settings";
import { Whitelist } from "src/core/Whitelist";
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

    setProjects(wl:Whitelist){
        this.whitelist = wl;
    }
    setDefaultValue(v:string){
        this.defaultValue = v;
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
}
