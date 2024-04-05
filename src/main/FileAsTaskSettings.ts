import { PropertySettings } from "src/core/PropertySettings";


export const FATPROPERTY = {
    context:"context",
    status:"status",
    project:"project",
    title:"title",
    starred:"starred"
} as const;

type ObjectValues<T> = T[keyof T];
export type FATProperty = ObjectValues<typeof FATPROPERTY>;

export type FATSettings = Record<FATProperty,PropertySettings>;

export class FATSettingsHelper {
    static allowedValuesToRecord(allowedValues:string[]):Record<string,string>{
        let result:Record<string,string> = {};
        for(let i=0;i<allowedValues.length;i++){
            result[allowedValues[i]] = allowedValues[i];
        }
        return result;
    }

    //static allowedValuesToString(allowedValues:string[]):string{
    //    return allowedValues.join(",");
    //}
}

export const DEFAULT_SETTINGS: FATSettings = {
    [FATPROPERTY.context]:{
        allowedValues:["Desk","Deep","Phone","Read","None"],
        defaultValue:"None"
    },
    [FATPROPERTY.status]:{
        allowedValues:["Inbox","Next","Deferred","Waiting","Done"],
        defaultValue:"Inbox"
    },
    [FATPROPERTY.starred]:{
        allowedValues:["✰","⭐"],
        defaultValue:"✰"
    },
    [FATPROPERTY.title]:{
        defaultValue:"no title"
    },
    [FATPROPERTY.project]:{
        defaultValue:"no project"
    }
}
