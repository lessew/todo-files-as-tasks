import { Whitelist } from "./Whitelist";

export class PropertySettings {
    propName:string;
    whitelist?:Whitelist;
    defaultValue:string;

    constructor(prop:string,def:string,whitelist?:Whitelist){
        this.propName = prop;
        this.defaultValue = def;
        this.whitelist = whitelist;
    }
}


export const DEFAULT_PROPERTYNAMES = {
    context:"context",
    status:"status",
    project:"project",
    title:"title",
    starred:"starred"
} as const;

export type Settings = Record<string,PropertySettings>;

/*
export class FATSettings {
    private propertySettings:Map<string,PropertySettings>;
    
    addPropertySetting(propName:string,defaultValue:string,whitelist:string[]):void{
        let wl = new Whitelist(whitelist);
        let propSettings = new PropertySettings(propName,defaultValue,wl);
        this.propertySettings.set(propName,propSettings);
    }

    //getAsArray():PropertySettings[]{
     //   return this.propertySettings.values;
    //}

    //addPropertySetting(propName:string,setting:PropertySettings):void{
    //    this.propertySettings.set(propName,setting);
    //}

    //addSettings(settings:Map<string,PropertySettings>):void{
    //    this.propertySettings = settings;
    //}
}
*/

export const DEFAULT_SETTINGS: Settings = {
    [DEFAULT_PROPERTYNAMES.context]:
        new PropertySettings(
            DEFAULT_PROPERTYNAMES.context,
            "None",
            new Whitelist(["Desk","Deep","Phone","Read","None"])),
    [DEFAULT_PROPERTYNAMES.status]:
        new PropertySettings(
            DEFAULT_PROPERTYNAMES.status,
            "Inbox",
            new Whitelist(["Inbox","Next","Deferred","Waiting","Done"])),
    [DEFAULT_PROPERTYNAMES.starred]:
        new PropertySettings(
            DEFAULT_PROPERTYNAMES.starred,
            "✰",
            new Whitelist(["✰","⭐"])),
    [DEFAULT_PROPERTYNAMES.title]:
        new PropertySettings(
            DEFAULT_PROPERTYNAMES.title,
            "no title"),
    [DEFAULT_PROPERTYNAMES.project]:
        new PropertySettings(
            DEFAULT_PROPERTYNAMES.project,
            "no project")
}
