import { FileModel } from "./FileModel";
import { Property } from "./Interfaces/Property";
import { Settings } from "./Settings";

export class FileAsTask{
    file:FileModel;
    properties:Record<string,Property>;
    
    constructor(file:FileModel,settings:Settings){
        this.file = file;
        this.properties = settings.getProperties(file);
    }


    get(propName:string):string{
        return this.properties[propName].getValue();
    }

    async set(propName:string,val:string):Promise<void>{
        await this.properties[propName].setValue(val);
    }
}