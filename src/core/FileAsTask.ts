import { FileModel } from "./File";
import { Property } from "./Property";

export class FileAsTask{
    file:FileModel;
    properties:Record<string,Property>;
    
    constructor(file:FileModel,properties:Record<string,Property>){
        this.file = file;
        this.properties = properties;
    }

    get(propName:string):string{
        return this.properties[propName].getValue();
    }

    async set(propName:string,val:string):Promise<void>{
        await this.properties[propName].setValue(val);
    }
}