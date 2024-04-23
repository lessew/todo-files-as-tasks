import { FileModel } from "src/core/FileModel";
import { Property } from "src/core/Property";
import { PropertySettings } from "src/core/Settings";
import { Whitelist } from "src/core/Whitelist";

export class ToplevelFolderPropertySettings implements PropertySettings {
    propName: string;
    whitelist:Whitelist;
    defaultValue:string;

    constructor(n:string){
        this.propName = n;
    }

    setProjects(wl:Whitelist){
        this.whitelist = wl;
    }
    setDefaultValue(v:string){
        this.defaultValue = v;
    }

    adaptToProperty(file: FileModel): Property {
        throw new Error("Method not implemented.");
    }
}
