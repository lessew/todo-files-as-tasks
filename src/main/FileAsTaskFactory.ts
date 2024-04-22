import { DEFAULT_PROPERTYNAMES, Settings } from "src/core/Settings";
import { FileModel } from "../core/FileModel";
import { FileAsTask } from "src/core/FileAsTask";
import { BaseNameProperty } from "src/core/Properties/BasenameProperty";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";
import { WhitelistYAMLProperty } from "src/core/Properties/WhitelistYAMLProperty";
import { Property } from "src/core/Property";
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
            [DEFAULT_PROPERTYNAMES.title]: new BaseNameProperty(file),
            [DEFAULT_PROPERTYNAMES.project]: new ToplevelFolderProperty(settings.project.defaultValue,settings.project.whitelist!,file),
            [DEFAULT_PROPERTYNAMES.context]: new WhitelistYAMLProperty(DEFAULT_PROPERTYNAMES.context,settings.context.defaultValue,settings.context.whitelist!,file),
            [DEFAULT_PROPERTYNAMES.status]:new WhitelistYAMLProperty(DEFAULT_PROPERTYNAMES.status,settings.status.defaultValue,settings.status.whitelist!,file),
            [DEFAULT_PROPERTYNAMES.starred]:new BooleanYAMLProperty(DEFAULT_PROPERTYNAMES.starred,settings.starred.defaultValue,settings.starred.whitelist!,file)
        } ;
        let f = new FileAsTask(file,properties as Record<string,Property>);
        return f;
    }
}
