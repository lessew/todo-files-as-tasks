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

export class FATSettings {
    [FATPROPERTY.title]:PropertySettings;
    [FATPROPERTY.project]:PropertySettings;
    [FATPROPERTY.context]:PropertySettings;
    [FATPROPERTY.starred]:PropertySettings;
    [FATPROPERTY.status]:PropertySettings;
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
