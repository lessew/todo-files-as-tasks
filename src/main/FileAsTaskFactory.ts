import { PROPERTYNAMES, Settings } from "src/core/FileAsTaskSettings";
import { FileModel } from "../core/Interfaces/FileModel";
import { FileAsTask } from "src/core/FileAsTask";
import { BaseNameProperty } from "src/core/Properties/BasenameProperty";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";
import { WhitelistYAMLProperty } from "src/core/Properties/WhitelistYAMLProperty";
import { Property } from "src/core/Interfaces/Property";
import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAMLProperty";

export class FileAsTaskFactory {
      
    static loadFileAsTask(file:FileModel,settings:Settings):FileAsTask{
        if(settings.context.whitelist===undefined 
            || settings.project.whitelist===undefined 
            || settings.status.whitelist===undefined
            || settings.starred.whitelist===undefined
        ){
            console.error(`settings not set correctly, aborting`);           
            throw new Error(`settings not set correctly, aborting ${settings.starred.whitelist?.size()}`)  
        }
        
        let properties = {
            [PROPERTYNAMES.title]: new BaseNameProperty(file),
            [PROPERTYNAMES.project]: new ToplevelFolderProperty(settings.project.defaultValue,settings.project.whitelist!,file),
            [PROPERTYNAMES.context]: new WhitelistYAMLProperty(PROPERTYNAMES.context,settings.context.defaultValue,settings.context.whitelist!,file),
            [PROPERTYNAMES.status]:new WhitelistYAMLProperty(PROPERTYNAMES.status,settings.status.defaultValue,settings.status.whitelist!,file),
            [PROPERTYNAMES.starred]:new BooleanYAMLProperty(PROPERTYNAMES.starred,settings.starred.defaultValue,settings.starred.whitelist!,file)
        } ;
        let f = new FileAsTask(file,properties as Record<string,Property>);
        return f;
    }
}
