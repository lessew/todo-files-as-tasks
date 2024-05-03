import { FileModel } from "./Interfaces/FileModel";
import { Property } from "./Interfaces/Property";
import { Settings } from "./Settings";

export class FileAsTask{
    file:FileModel;
    static PROJECT_FIELD = "project";
    static TITLE_FIELD = "title";

    static isReservedField(f:string):boolean{
        return (f==FileAsTask.PROJECT_FIELD || f==FileAsTask.TITLE_FIELD);
    }

    // TODO make this private
    properties:Record<string,Property>;
    
    constructor(file:FileModel,settings:Settings){
        this.file = file;
        this.properties = settings.getProperties(file);
    }

    // TODO refactor to use this method instead of properties property
    getProperty(propName:string):Property{
        return this.properties[propName];
    }

    getProperties():Record<string,Property>{
       return this.properties;
    }

    get(propName:string):string{
        return this.properties[propName].getValue();
    }

    async set(propName:string,val:string):Promise<void>{
        await this.properties[propName].setValue(val);
    }
}