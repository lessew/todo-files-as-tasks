import { FileModel } from "./Interfaces/FileModel";
import { BasenamePropertySettings } from "./Properties/Basename/BasenamePropertySettings";
import { BooleanYAMLPropertySettings } from "./Properties/BooleanYAML/BooleanYAMLPropertySettings";
import { ToplevelFolderPropertySettings } from "./Properties/ToplevelFolder/ToplevelFolderPropertySettings";
import { WhitelistYAMLPropertySettings } from "./Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { Whitelist } from "./Whitelist";
import { PropertySettings } from "./Interfaces/PropertySettings";
import { Property } from "./Interfaces/Property";
import { FileAsTask } from "./FileAsTask";


export class Settings {
    private propertySettings:Map<string,PropertySettings>;
    
    constructor(){
        this.propertySettings = new Map<string,PropertySettings>();
    }

    add(s:PropertySettings):Settings{
        this.propertySettings.set(s.propName,s);
        return this;
    }

    get(name:string):PropertySettings{
        let s = this.propertySettings.get(name);
        if(s==undefined){
            throw Error(`Setting does not exist ${name}`)
        }
        return s;
    }

    getAsMap():Map<string,PropertySettings>{
        return this.propertySettings;
    }

    getProperties(file:FileModel):Record<string,Property>{
        let result:Record<string,Property> = {};
        this.propertySettings.forEach((aProp)=>{
            result[aProp.propName] = aProp.adaptToProperty(file);
        })
        return result;
    }

    static loadFromJSON(json:any):Settings{
        return new Settings();
    }
}

// TODO add errands to context defaults
export const DEFAULT_SETTINGS:Settings = new Settings()
    .add(new BasenamePropertySettings(FileAsTask.TITLE_FIELD))
    .add(new ToplevelFolderPropertySettings(FileAsTask.PROJECT_FIELD))
    .add(new BooleanYAMLPropertySettings("starred","✰", new Whitelist(["✰","⭐"])))
    .add(new WhitelistYAMLPropertySettings("context","None", new Whitelist(["Desk","Deep","Phone","Read","None"])))
    .add(new WhitelistYAMLPropertySettings("status","Inbox", new Whitelist(["Inbox","Next","Deferred","Waiting","Done"])));


