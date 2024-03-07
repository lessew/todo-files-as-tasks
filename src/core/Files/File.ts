import { FilePathProperty } from "./FileProperties/FilePathProperty";
import { FileProperty } from "./FileProperty";
import { FileSystem } from "./FileSystem";

export class File {
    fullPath:FilePathProperty;
    properties:Record<string,FileProperty>;
    fileSystem:FileSystem;
   
    constructor(fullpath:string,fs:FileSystem){
        let fp = new FilePathProperty(this,"fullpath");
        fp.value = fullpath;
        this.fullPath = fp;
        this.fileSystem = fs;
    }

    get(prop:string):FileProperty{
        const r = this.properties[prop];
        return r;
    }

    set(name:string,value:string):void{
        let r = this.properties[name];
        r.value = value;
    }


    move(newFullPath: string): void{
        this.fileSystem.move(this,newFullPath);
    }
    
    getYAMLProperty(name:string): string{
        return this.fileSystem.getYAMLProperty(this,name);
    }
    
    setYAMLProperty(name: string, value: string):void{
        this.fileSystem.setYAMLProperty(this,name,value);
    }

    /* TBI
    static async createTask(title:string,project:string,config:TaskConfiguration,fileSystem:FileSystem):Promise<void>{
        const path = fileSystem.rootPath + "/" + project + "/" + title + ".md";
        const file:File = await fileSystem.createMarkdownFile(path);
        let aTask = new Task(file,config);
        aTask.context = config.validContextValues.default;
        aTask.status = config.validStatusValues.default;
        aTask.starred = config.validStarredValues.default;
    }
    */
    
}
