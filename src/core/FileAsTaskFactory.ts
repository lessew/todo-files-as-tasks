import { FileAsTask } from "./FileAsTask";
import { FileModel } from "./FileModel";
import { BaseNameProperty } from "./Properties/Basename/BasenameProperty";
import { BooleanYAMLProperty } from "./Properties/BooleanYAML/BooleanYAMLProperty";
import { ToplevelFolderProperty } from "./Properties/ToplevelFolder/ToplevelFolderProperty";
import { WhitelistYAMLProperty } from "./Properties/WhitelistYAML/WhitelistYAMLProperty";
import { Property } from "./Interfaces/Property";
import { DEFAULT_PROPERTYNAMES, Settings } from "./Settings";


export class FileAsTaskFactory {
      
    static loadFileAsTask(file:FileModel,settings:Settings):FileAsTask{
        
               
        let properties = {
            [DEFAULT_PROPERTYNAMES.title]: new BaseNameProperty(file),
            [DEFAULT_PROPERTYNAMES.project]: new ToplevelFolderProperty(settings.project.defaultValue,settings.project.whitelist!,file),
       } ;
        settings.forEach(prop => {
            properties[prop.]
        });

        let properties = settings.toProperties(file);
        let f = new FileAsTask(file,properties as Record<string,Property>);
        return f;
    }
}
