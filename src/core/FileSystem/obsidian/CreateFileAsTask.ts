import { ObsidianFile } from "./ObsidianFile";
import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAML/BooleanYAMLProperty";
import { WhitelistYAMLProperty } from "src/core/Properties/WhitelistYAML/WhitelistYAMLProperty";
import FileAsTaskPlugin from "main";
import { FileAsTask } from "../FileAsTask";
import { PropertySettings } from "src/core/Properties/PropertySettings";
import { PluginSettings } from "src/core/Configuration/PluginSettings";

// TODO add option to set default project, status, etc value

export async function createFileAsTask(root:string, data:Record<string,string>,plugin:FileAsTaskPlugin){
    let path = data[FileAsTask.PROJECT_FIELD] + "/" + data[FileAsTask.TITLE_FIELD] + ".md";

    await this.plugin.obsidianFacade.createEmptyFile(root + "/" + path);        
    
    let file = ObsidianFile.create(root,root + "/" + path,plugin);
    let settings:PluginSettings = plugin.pluginSettings;
    let map =settings.getAsMap();
    map.forEach((value ) => {
        if(value.getType()=="booleanYAML"){
            let prop = new BooleanYAMLProperty(value.propName,value.defaultValue,value.whitelist!,file);
            if(value.propName in data){
                prop.setValue(data[value.propName]);
            }
            else{
                prop.setValue(value.defaultValue);
            }
        }
        else if(value.getType()=="whitelistYAML"){
            let prop = new WhitelistYAMLProperty(value.propName,value.defaultValue,value.whitelist!,file);
            if(value.propName in data){
                prop.setValue(data[value.propName]);
            }
            else{
                prop.setValue(value.defaultValue);
            }
        }
    })
}