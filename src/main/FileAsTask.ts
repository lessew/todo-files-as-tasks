import { Property } from "../core/Property";
import { FileModel } from "../core/Interfaces/FileModel";
import { FATProperty, FATSettings } from "../core/FileAsTaskSettings";
import { Starred, Status, Title, Context, Project } from "./FileAsTaskProperties";

export class FileAsTask {
    file:FileModel;

    context:Context;
    project:Project;
    status:Status;
    starred:Starred;
    title:Title;
    
    constructor(file:FileModel,settings:FATSettings){
        this.file = file;
        this.context= new Context(settings.context,file);
        this.project = new Project(settings.project,file);
        this.status = new Status(settings.status,file);
        this.starred = new Starred(settings.starred,file);
        this.title = new Title(file);
    }

    get(propName:FATProperty):string{
        if(propName in this){
            return (this[propName] as Property).getValue();
        }
        else{
            return "";
        }
    }
}
