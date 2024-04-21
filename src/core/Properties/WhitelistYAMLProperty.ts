import { FileModel } from "../File";
import { Property } from "../Property";
import { Whitelist } from "../Whitelist";

export class WhitelistYAMLProperty implements Property{

    file: FileModel;
    yamlPropname:string;
    private val:string;
    defaultValue: string;
    whitelist:Whitelist;


    constructor(propName:string,defaultValue:string,whitelist:Whitelist,file:FileModel){
        this.yamlPropname = propName;
        this.file = file;
        this.whitelist = whitelist;
        this.defaultValue = defaultValue;
    }

    setValue(val: string): void {
        if(this.validate(val)){
            this.file.setYAMLProperty(this.yamlPropname,val);
        }
        else{
            console.error(`Cannot set value to '${val}' as it is not part of the allowed value list ${this.whitelist.toString()}`)
        }
    }
    
    getValue(): string {
        if(this.val===undefined){
            const val = this.file.getYAMLProperty(this.yamlPropname);
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