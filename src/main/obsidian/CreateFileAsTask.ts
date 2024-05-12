import { PluginSettings } from "src/core/PluginSettings";
import { ObsidianFile } from "./ObsidianFile";
import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAML/BooleanYAMLProperty";
import { WhitelistYAMLProperty } from "src/core/Properties/WhitelistYAML/WhitelistYAMLProperty";
import { FileAsTask } from "src/core/FileAsTask";


// TODO add option to set default project, status, etc value

export async function createFileAsTask(root:string, data:Record<string,string>,settings:PluginSettings){
    let path = data[FileAsTask.PROJECT_FIELD] + "/" + data[FileAsTask.TITLE_FIELD] + ".md";
    await ObsidianFile.createMarkdownFile(root,path);

    let file = await ObsidianFile.create(root,root + "/" + path);
    let map = settings.getAsMap();
    map.forEach(value => {
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