import { FATError } from "../Error";
import { FileAsTask } from "../FileSystem/FileAsTask";
import { Filter } from "../FileSystem/Filter";
import { PluginSettings } from "./PluginSettings";
import { Whitelist } from "../Properties/Whitelist";
import { YAMLParser } from "./YAMLParser";

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

    loadFolders(folders:string[]):void{
        if(this.stateIsError()){
            return;
        }
        this.folders = folders;
        this.trySetFoldersInSettings();
    }

    loadSettings(settings:PluginSettings):void{
        if(this.stateIsError()){
            return;
        } 
        this.settings = settings;
        this.trySetFoldersInSettings();
    }

    trySetFoldersInSettings():void{
        if(this.folders!=undefined && this.settings!=undefined){
            let projectSettings = this.settings.get(FileAsTask.PROJECT_FIELD);
            projectSettings.whitelist = new Whitelist(this.folders);
            projectSettings.defaultValue = this.folders[0];
        }
    }

    loadRootPath():void{
        if(this.stateIsError()){
            return;
        }
        let result = this.parser.parseRootPath();
        if(FATError.isError(result)){
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
        if(FATError.isError(result)){
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
        if(FATError.isError(action)){
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