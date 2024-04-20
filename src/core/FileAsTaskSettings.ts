import { PropertySettings } from "./Property";
import { Whitelist } from "./Whitelist";


export const DEFAULT_PROPERTYNAMES = {
    context:"context",
    status:"status",
    project:"project",
    title:"title",
    starred:"starred"
} as const;

export type Settings = Record<string,PropertySettings>;

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
