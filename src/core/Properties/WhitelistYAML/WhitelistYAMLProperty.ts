import { FileModel } from "../../FileModel";
import { Property } from "../../Interfaces/Property";
import { Whitelist } from "../../Whitelist";

export class WhitelistYAMLProperty implements Property{
    file: FileModel;
    propName:string;
    private val:string;
    defaultValue: string;
    whitelist:Whitelist;

    constructor(propName:string,defaultValue:string,whitelist:Whitelist,file:FileModel){
        this.propName = propName;
        this.file = file;
        this.whitelist = whitelist;
        this.defaultValue = defaultValue;
    }

    async setValue(val: string): Promise<void> {
        if(this.validate(val)){
            this.file.setYAMLProperty(this.propName,val);
        }
        else{
            console.error(`Cannot set value to '${val}' as it is not part of the allowed value list ${this.whitelist.toString()}`)
        }
    }
    
    getValue(): string {
        if(this.val===undefined){
            const val = this.file.getYAMLProperty(this.propName);
            if(val===null){
                this.val = this.defaultValue;
            }
            else if(this.validate(val)){
                this.val = val;
            }
            else{
                this.val = this.defaultValue;
            }
        }
        return this.val;
    }

    validate(newVal:string):boolean{
        return this.whitelist.contains(newVal);
    }

}