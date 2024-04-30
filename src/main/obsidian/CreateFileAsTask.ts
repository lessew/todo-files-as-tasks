import { App } from "obsidian";
import { BasenamePropertySettings } from "src/core/Properties/Basename/BasenamePropertySettings";
import { ToplevelFolderPropertySettings } from "src/core/Properties/ToplevelFolder/ToplevelFolderPropertySettings";
import { Settings } from "src/core/Settings";
import { ObsidianFile } from "./ObsidianFile";
import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAML/BooleanYAMLProperty";
import { WhitelistYAMLProperty } from "src/core/Properties/WhitelistYAML/WhitelistYAMLProperty";

export async function createFileAsTask(root:string, data:Record<string,string>,settings:Settings){
    let project = settings.get("project") as ToplevelFolderPropertySettings;
    let title = settings.get("title") as BasenamePropertySettings;
    let path = data["project"] + "/" + data["title"] + ".md";
    await ObsidianFile.createMarkdownFile(root,path);

    setTimeout(() =>{
        let file = new ObsidianFile(root,root + "/" + path);
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
    },150)

}