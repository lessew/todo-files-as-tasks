import { Whitelist } from "./Whitelist";
import { FileModel } from "../FileSystem/File";
import { Property } from "./Property";

export type PropertyType = "basename" | "whitelistYAML" | "booleanYAML" | "toplevelfolder"

export interface PropertySettings {
    propName:string
    whitelist?:Whitelist;
    defaultValue:string;
    adaptToProperty(file:FileModel):Property;
    getType():PropertyType;
}