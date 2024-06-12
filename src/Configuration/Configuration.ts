import { FileAsTask } from "../FileAsTask/FileAsTask";
import { Filter } from "../FileAsTask/Filter";
import { PluginSettings } from "./PluginSettings";
import { Whitelist } from "../FileAsTask/PropertyStrategies/Whitelist";
import { YAMLParser } from "./YAMLParser";
import { YAMLStrategy } from "src/FileAsTask/PropertyStrategies/YAMLStrategy";

export class Configuration{
    private parser:YAMLParser;
    private settings:PluginSettings;
    private state:Error | true;
    private rootPath:string;
    private filters:Filter[];
    private folders:string[];
    private action:string;

    constructor(){
        this.state = true;
    }

    loadSource(source:string):void{
        if(this.stateIsError()){
            return;
        }
        this.parser = new YAMLParser();
        this.state = this.parser.loadSource(source);
    }

    loadDirectories(folders:string[]):void{
        if(this.stateIsError()){
            return;
        }
        this.folders = folders;
        this.trySetDirectoriesInSettings();
    }

    loadSettings(settings:PluginSettings):void{
        if(this.stateIsError()){
            return;
        } 
        this.settings = settings;
        this.trySetDirectoriesInSettings();
    }

    getYAMLStrategies():Map<string,YAMLStrategy>{
        return this.settings.yamlPropertyStrategies;
    }

    trySetDirectoriesInSettings():void{
        if(this.folders!=undefined && this.settings!=undefined){
            let projectSettings = this.settings.getYAMLStrategy(FileAsTask.PROJECT_FIELD);
            projectSettings.whitelist = new Whitelist(this.folders);
            projectSettings.defaultValue = this.folders[0];
        }
    }

    loadRootPath():void{
        if(this.stateIsError()){
            return;
        }
        let result = this.parser.parseRootPath();
        if(result instanceof Error){
            this.state = result;
        }
        else{
            this.rootPath = result;
        }
    }

    loadFilters():void{
        if(this.stateIsError()){
            return;
        }
        let result = this.parser.parseFilters(this.settings);
        if(result instanceof Error){
            this.state = result;
        }
        else{
            this.filters = result;
        }
    }

    loadAction():void{
        if(this.stateIsError()){
            return;
        }
        let action = this.parser.parseAction();
        if(action instanceof Error){
            this.state = action;
        }
        else{
            this.action = action;
        }
    }

    getAction():string{
        return this.action;
    }

    getSettings():PluginSettings{
        return this.settings;
    }


    getRootPath():string{
        return this.rootPath;
    }

    getFilters():Filter[]{
        return this.filters; 
    }

    getErrorState():Error{
        if(this.state==true){
            return Error("Error state requested but no error was set");
        }
        else{
            return this.state;
        }
    }

    stateIsError():boolean{
        return this.state!=true;
    }
}