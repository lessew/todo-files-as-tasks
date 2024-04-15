import { Whitelist } from "./Whitelist";

export interface PropertySettings {
    propName:string,
    whitelist?:Whitelist,
    defaultValue:string
}

export const PROPERTYNAMES = {
    context:"context",
    status:"status",
    project:"project",
    title:"title",
    starred:"starred"
} as const;


type ObjectValues<T> = T[keyof T];
export type PropertyType = ObjectValues<typeof PROPERTYNAMES>;

export type Settings = Record<PropertyType,PropertySettings>;

export const DEFAULT_SETTINGS: Settings = {
    [PROPERTYNAMES.context]:{
        propName:PROPERTYNAMES.context,
        whitelist:new Whitelist(["Desk","Deep","Phone","Read","None"]),
        defaultValue:"None"
    },
    [PROPERTYNAMES.status]:{
        propName:PROPERTYNAMES.status,
        whitelist:new Whitelist(["Inbox","Next","Deferred","Waiting","Done"]),
        defaultValue:"Inbox"
    },
    [PROPERTYNAMES.starred]:{
        propName:PROPERTYNAMES.starred,
        whitelist:new Whitelist(["✰","⭐"]),
        defaultValue:"✰"
    },
    [PROPERTYNAMES.title]:{
        propName:PROPERTYNAMES.title,
        defaultValue:"no title"
    },
    [PROPERTYNAMES.project]:{
        propName:PROPERTYNAMES.project,
        defaultValue:"no project"
    }
}
