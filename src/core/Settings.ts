import { FileModel } from "./FileModel";
import { BasenamePropertySettings } from "./Properties/Basename/BasenamePropertySettings";
import { BooleanYAMLPropertySettings } from "./Properties/BooleanYAML/BooleanYAMLPropertySettings";
import { ToplevelFolderPropertySettings } from "./Properties/ToplevelFolder/ToplevelFolderPropertySettings";
import { WhitelistYAMLPropertySettings } from "./Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { Whitelist } from "./Whitelist";
import { PropertySettings } from "./Interfaces/PropertySettings";


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
/*
    getPropertySettings(key:string):PropertySettings | undefined{
        return this.propertySettings.get(key);
    }

    getAllPropertySettings():Map<string,PropertySettings>{
        return this.propertySettings;
    }

    getAsArray():PropertySettings[]{
        return [...this.propertySettings.values()]
    }
*/
}

export const DEFAULT_SETTINGS:Settings = new Settings()
    .add(new BasenamePropertySettings("title"))
    .add(new ToplevelFolderPropertySettings("project"))
    .add(new BooleanYAMLPropertySettings("starred","✰", new Whitelist(["✰","⭐"])))
    .add(new WhitelistYAMLPropertySettings("context","None", new Whitelist(["Desk","Deep","Phone","Read","None"])))
    .add(new WhitelistYAMLPropertySettings("status","Inbox", new Whitelist(["Inbox","Next","Deferred","Waiting","Done"])));


