import { FileAsTask } from "src/core/FileAsTask";
import { FileModel } from "src/core/FileModel";
import { Property } from "src/core/Interfaces/Property";
import { Settings } from "src/core/Settings";

export class FileAsTaskPrototype{
    settings:Settings;
    properties:Record<string,Property>;

    constructor(s:Settings){
        this.settings = s;

       
    }

    clone(file:FileModel):FileAsTask{
        let properties:Record<string,Property> = {};

        this.settings.getAsArray().forEach(aProp =>{
            //properties[aProp.propName] = 
        });

        return new FileAsTask(file,properties);
    }
}