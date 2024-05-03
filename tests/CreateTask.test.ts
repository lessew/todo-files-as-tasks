export {}
// TODO test craetion of task

describe('Create file as task, write to disk', () => {

    test('DUMMY', async () => {
        expect(true).toBe(true);
    });
});

/*
import { BasenamePropertySettings } from "src/core/Properties/Basename/BasenamePropertySettings";
import { WhitelistYAMLPropertySettings } from "src/core/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { Settings } from "src/core/Settings";
import { Whitelist } from "src/core/Whitelist";
import { ObsidianFile } from "src/main/obsidian/ObsidianFile";
import { FileModel } from "src/core/Interfaces/FileModel";
import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAML/BooleanYAMLProperty";
import { WhitelistYAMLProperty } from "src/core/Properties/WhitelistYAML/WhitelistYAMLProperty";

describe('Create file as task, write to disk', () => {

    test('create', async () => {
        let settings = new Settings()
        .add(new BasenamePropertySettings("default"))
        .add(new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])));

        let root = "path"
        let filePath = "path/to/file.md";
        let model:FileModel = await ObsidianFile.createMarkdownFile(root,filePath);

        let input = {
            project:"a project",
            title:"a title",
            context:"Desk",
            status:"Next"
        } as Record<string,string>

        let props = settings.getProperties(model);
        let propSettings = settings.getAsMap();

        propSettings.forEach((aPropSetting) =>{
            if(aPropSetting.getType()=="booleanYAML"){
                let prop = new BooleanYAMLProperty(
                    aPropSetting.propName,
                    aPropSetting.defaultValue,
                    aPropSetting.whitelist!,
                    model);
                    if(input[aPropSetting.propName] != undefined){
                        prop.setValue(input[aPropSetting.propName]);
                    }
                    else{
                        prop.setValue(prop.defaultValue);
                    }
            } 
            if(aPropSetting.getType()=="whitelistYAML"){
                let prop = new WhitelistYAMLProperty(
                    aPropSetting.propName,
                    aPropSetting.defaultValue,
                    aPropSetting.whitelist!,
                    model);
                    if(input[aPropSetting.propName] != undefined){
                        prop.setValue(input[aPropSetting.propName]);
                    }
                    else{
                        prop.setValue(prop.defaultValue);
                    }
            }
        })


        for (let key in props){
            let aProp = props[key];
            
            
        }

    });
  
});
*/