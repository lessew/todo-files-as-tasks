import { FATError } from "./Error";
import { Filter } from "./Filter";
import { PluginSettings } from "./PluginSettings";
import { SettingsModel, SettingsSavedFormatType } from "./SettingsModel";
import { YAMLParser } from "./YAMLParser";

export class Configuration{
    private parser:YAMLParser;
    private settings:PluginSettings;
    private state:Error | true;
    private rootPath:string;
    private filters:Filter[];

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
    }

    loadSettings(settings:SettingsSavedFormatType):void{
        if(this.stateIsError()){
            return;
        } 
        this.settings = SettingsModel.loadDeepCopy(settings);
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