import { Whitelist } from "../Whitelist";
import { FileModel } from "./FileModel";
import { Property } from "./Property";

export interface PropertySettings {
    propName:string,
    whitelist?:Whitelist;
    defaultValue:string;
    adaptToProperty(file:FileModel):Property;
}