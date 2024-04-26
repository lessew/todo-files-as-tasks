import { PropertyType } from "src/core/Interfaces/PropertySettings";
import { BasenamePropertySettings } from "src/core/Properties/Basename/BasenamePropertySettings";
import { BooleanYAMLPropertySettings } from "src/core/Properties/BooleanYAML/BooleanYAMLPropertySettings";
import { ToplevelFolderPropertySettings } from "src/core/Properties/ToplevelFolder/ToplevelFolderPropertySettings";
import { WhitelistYAMLPropertySettings } from "src/core/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { Settings } from "src/core/Settings";
import { Whitelist } from "src/core/Whitelist";

type savedFormat = {
    properties: {
        propName:string,
        defaultValue:string,
        whitelist?:string[],
        type:PropertyType
    }[]
}

export class SettingsModel{
    
    static loadDeepCopy(input:savedFormat):Settings{
        let settings = new Settings();

        input.properties.forEach((aprop) => {
            if(aprop.type=="basename"){
                settings.add(new BasenamePropertySettings(aprop.propName));
            }
            else if(aprop.type=="toplevelfolder"){
                settings.add(new ToplevelFolderPropertySettings(aprop.propName));
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

    static deepCopy(settings:Settings):savedFormat{
        let map = settings.getAsMap();
        let result:savedFormat = {
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