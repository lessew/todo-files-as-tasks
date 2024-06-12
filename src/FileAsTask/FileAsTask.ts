import { File } from "../FileSystem/File";
import { YAMLStrategy } from "./PropertyStrategies/YAMLStrategy";
import { Whitelist } from "./PropertyStrategies/Whitelist";
import { PathStrategy } from "./PropertyStrategies/PathStrategy";
import { stringify } from "querystring";
import { PropertyFactory } from "./PropertyFactory";

export class FileAsTask{
    file:File;
    static PROJECT_FIELD = "project";
    static TITLE_FIELD = "title";

    private pathStrategy:PathStrategy;
    private yamlStrategies:Map<string,YAMLStrategy>;

    constructor(file:File,yamlStrategies:Map<string,string>){
        this.file = file;
        this.yamlStrategies = new Map();
        yamlStrategies.forEach((value,key) => {
            let strat = PropertyFactory.create(value);
            this.yamlStrategies.set(key)
        })
        this.yamlStrategies = yamlStrategies;
    }

    getProjectList():Whitelist{
        return this.pathStrategy.getFolderlist();
    }
    getProject():string{
        return this.pathStrategy.getFolder(this.file.fullPath);
    }

    getLink():string{
        return this.file.fullPath;
    }

    async setProject(newProject:string):Promise<void>{
        let newPath = this.pathStrategy.updateFolder(newProject,this.file.fullPath);
        if(this.pathStrategy.validate(newPath)){
            await this.file.move(newPath)
        }{
            throw new Error(`setProject: path is not valid: ${newPath}`)
        }
    }

    getTitle():string{
        return this.pathStrategy.getBasename(this.file.fullPath);
    }

    async setTitle(basename:string):Promise<void>{
        let newPath = this.pathStrategy.updateBasename(basename,this.file.fullPath); 
        await this.file.move(newPath);
    }

    getYAMLProperty(propName:string):string{
        let prop = this.file.getYAMLProperty(propName);
        return prop==null ? "" : prop ;
    }

    async setYAMLPropety(propName:string,propValue:string):Promise<void>{
        let strat = this.yamlStrategies[propName];
        if(strat.validate(propValue)){
            await this.file.setYAMLProperty(propName, propValue);
        }
    }

    get(propName:string):string{
        if(propName===FileAsTask.PROJECT_FIELD){
            return this.getProject();
        }
        if(propName==FileAsTask.TITLE_FIELD){
            return this.getTitle();
        }
        return this.getYAMLProperty(propName);
    }
}