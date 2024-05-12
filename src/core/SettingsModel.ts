import { BasenamePropertySettings } from "./Properties/Basename/BasenamePropertySettings";
import { ToplevelFolderPropertySettings } from "./Properties/ToplevelFolder/ToplevelFolderPropertySettings";
import { BooleanYAMLPropertySettings } from "./Properties/BooleanYAML/BooleanYAMLPropertySettings";
import { WhitelistYAMLPropertySettings } from "./Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { PropertyType } from "./Interfaces/PropertySettings";
import { DEFAULT_SETTINGS, PluginSettings } from "./PluginSettings";
import { Whitelist } from "./Whitelist";

export type SettingsSavedFormatType = {
    properties: {
        propName:string,
        defaultValue:string,
        whitelist?:string[],
        type:PropertyType
    }[]
}

function isValidSettingsType(input:SettingsSavedFormatType | any):input is SettingsSavedFormatType{
    return input!=undefined && input !=null && "properties" in input;
}

export class SettingsModel{
    
    static loadDeepCopy(input:SettingsSavedFormatType | any):PluginSettings{

        if(!isValidSettingsType(input)){
            return DEFAULT_SETTINGS;
        }
       
        let settings = new PluginSettings();

        input.properties.forEach((aprop) => {
            if(aprop.type=="basename"){
                settings.add(new BasenamePropertySettings(aprop.propName));
            }
            else if(aprop.type=="toplevelfolder"){
                settings.add(
                    new ToplevelFolderPropertySettings(aprop.propName)
                    .setProjects(new Whitelist(aprop.whitelist!))
                    .setDefaultValue(aprop.defaultValue)
                );
                
            }
            else if(aprop.type=="booleanYAML"){
                settings.add(new BooleanYAMLPropertySettings(aprop.propName,aprop.defaultValue,new Whitelist(aprop.whitelist!)));
            }
            else if(aprop.type=="whitelistYAML"){
                settings.add(new WhitelistYAMLPropertySettings(aprop.propName,aprop.defaultValue,new Whitelist(aprop.whitelist!)));
            }
        });
        return settings;
    }

    static deepCopy(settings:PluginSettings):SettingsSavedFormatType{
        let map = settings.getAsMap();
        let result:SettingsSavedFormatType = {
            properties:[]
        }
        map.forEach(value => {
            let type = {
                propName:value.propName,
                defaultValue:value.defaultValue,
                whitelist:value.whitelist?.toArray(),
                type:value.getType()
            }
            result.properties.push(type)
        })
        return result;
    }
}