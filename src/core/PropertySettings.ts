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
