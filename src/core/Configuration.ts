import { FATError } from "./Error";
import { Filter } from "./Filter";
import { PluginSettings } from "./PluginSettings";
import { SettingsModel, SettingsSavedFormatType } from "./SettingsModel";
import { YAMLParser } from "./YAMLParser";

export class Configuration{
    private parser:YAMLParser;
    private settings:PluginSettings;


    loadSource(yaml:string):true|Error{
        this.parser = new YAMLParser();
        return this.parser.loadSource(yaml);
    }

    loadFolders(folders:string[]):void{

    }

    loadSettings(settings:SettingsSavedFormatType):true|Error{
        this.settings = SettingsModel.loadDeepCopy(settings);
        return true;
    }

    getRootPath():string | FATError{
        return this.parser.parseRootPath();
    }

    getFilters():Filter[] | FATError{
        return this.parser.parseFilters(this.settings);
    }

    


}