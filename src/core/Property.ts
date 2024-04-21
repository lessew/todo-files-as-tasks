import { FileModel } from "./FileModel";
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


export interface Property{
    defaultValue:string;
    file:FileModel;
    setValue(val:string):Promise<void> | void;
    getValue():string;
}
