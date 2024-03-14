import { PathProperty } from "./Properties/PathProperty";
import { Property } from "../AbstractProperty";
import { PathPropertyDAO } from "../../main/obsidian/PathPropertyDAO";

export class File {
    fullPath:PathProperty;
    properties:Record<string,Property>;
    static ERR_PROPERTY_INVALID = "ERROR: invalid property";
    static ERR_PROPERTY_NO_VALUE = "ERROR: no value set for property"
   
    constructor(fullpath:string){
        let fp = new PathProperty("fullpath");
        let dao = new PathPropertyDAO(this,fp);
        fp.setDAO(dao);
        
        fp.value = fullpath;
        this.fullPath = fp;
    }

    propertyIsSet(name:string):boolean{
        return (name in this.properties);
    }
/*
    get(prop:string):string{
        if(this.propertyIsSet(prop)){
            const r = this.properties[prop];
            if(typeof r.value === "string"){
                return r.value
            }
            return File.ERR_PROPERTY_NO_VALUE;
        }
        return File.ERR_PROPERTY_INVALID;
    }

    set(name:string,value:string):void{
        if(this.propertyIsSet(name)){
            let r = this.properties[name];
            try{
                r.value = value;
                this.setYAMLProperty(name,value);
            }
            catch(e){
                console.log("error:" + e);
            }
        }
        //throw new Error(File.ERR_PROPERTY_INVALID);
    }
    */
/*
    move(newFullPath: string): void{
        this.fileSystemFacade.move(this,newFullPath);
    }
    
    getYAMLProperty(name:string): string{
        return this.fileSystemFacade.getYAMLProperty(this,name);
    }
    
    setYAMLProperty(name: string, value: string):void{
        this.fileSystemFacade.setYAMLProperty(this,name,value);
    }

    setBasename(name:string):void{
        const newFullPath = this.fullPath.getNewFullPathWithBasename(name);
        this.move(newFullPath);
        this.fullPath.value = newFullPath;
    }

    moveToNewToplevelFolder(folderName:string){
        const newPath = this.fullPath.getNewFullPathWithTopLevelFolder(folderName);
        this.fullPath.value = newPath;
        this.move(newPath);
    }
*/
    loadPropertyValues():void{
        for(const propertyName in this.properties){
            const prop:FileProperty = this.properties[propertyName];
            prop.loadValue();
        }
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
