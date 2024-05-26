import { File } from "./File";
import { Property } from "../Properties/Property";
import { PluginSettings } from "../Configuration/PluginSettings";

export class FileAsTask{
    file:File;
    static PROJECT_FIELD = "project";
    static TITLE_FIELD = "title";

    static isReservedField(f:string):boolean{
        return (f==FileAsTask.PROJECT_FIELD || f==FileAsTask.TITLE_FIELD);
    }

    properties:Record<string,Property>;
    
    constructor(file:File,settings:PluginSettings){
        this.file = file;
        this.properties = settings.getProperties(file);
    }

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