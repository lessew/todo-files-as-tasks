import { Whitelist } from "./Whitelist";
import { File } from "../FileSystem/File";
import { Property } from "./Property";

export type PropertyType = "basename" | "whitelistYAML" | "booleanYAML" | "toplevelfolder"

export interface PropertySettings {
    propName:string
    whitelist?:Whitelist;
    defaultValue:string;
    adaptToProperty(file:File):Property;
    getType():PropertyType;
}