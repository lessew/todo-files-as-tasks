import { PropertySettings } from "src/core/PropertySettings";
import { PathStrategy } from "../PathStrategy";

export class ToplevelFolderStrategy extends PathStrategy{
    settings:PropertySettings;

    constructor(settings:PropertySettings){
        super();
        this.settings = settings;
    }

    validate(newValue:string):boolean{
        return (this.settings.allowedValues?.indexOf(newValue) != -1)
    }

    getValue(path:string){
        return this.getFolderName(path);
    }

}