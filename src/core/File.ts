import { PathProperty } from "./Properties/PathProperty";
import { Property } from "./Interfaces/Property";
import { PathPropertyDAO } from "../main/obsidian/PropertyDAOs/PathPropertyDAO";
import { PropertyDAO } from "./Interfaces/PropertyDAO";

export class File {
    fullPath:PathProperty;
    properties:Record<string,Property>;
    static ERR_PROPERTY_INVALID = "ERROR: invalid property";
    static ERR_PROPERTY_NO_VALUE = "ERROR: no value set for property"
   
    constructor(fullpath:string,pathPropertyDAO:PropertyDAO){
        let fp = new PathProperty("fullpath",fullpath,pathPropertyDAO);
        
        fp.setValue(fullpath);
        this.fullPath = fp;
    }

    propertyIsSet(name:string):boolean{
        return (name in this.properties);
    }

    isMarkdownFile():boolean{
        return this.fullPath.isMarkdownFile();
    }

    get(prop:string):string{
        if(this.propertyIsSet(prop)){
            const r = this.properties[prop];
            if(typeof r.getValue() === "string"){
                return r.getValue();
            }
            return File.ERR_PROPERTY_NO_VALUE;
        }
        return File.ERR_PROPERTY_INVALID;
    }

    set(name:string,value:string):void{
        if(this.propertyIsSet(name)){
            let r = this.properties[name];
            try{
                r.setValue(value);
            }
            catch(e){
                console.log("error:" + e);
            }
        }
        //throw new Error(File.ERR_PROPERTY_INVALID);
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
