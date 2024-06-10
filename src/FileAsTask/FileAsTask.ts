import { File } from "../FileSystem/File";
import { PropertyPathStrategy,PropertyStrategy } from "./PropertyStrategies/YAMLStrategy";
import { Whitelist } from "./PropertyStrategies/Whitelist";

export class FileAsTask{
    file:File;
    static PROJECT_FIELD = "project";
    static TITLE_FIELD = "title";

    private pathStrategy:PropertyPathStrategy;
    private yamlStrategies:Record<string,PropertyStrategy>;

    constructor(file:File,yamlStrategies:Record<string,PropertyStrategy>){
        this.file = file;
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