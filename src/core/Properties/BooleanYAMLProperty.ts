import { FileModel } from "../FileModel";
import { Property } from "../Property";
import { Whitelist } from "../Whitelist";

export class BooleanYAMLProperty implements Property{
    file: FileModel;
    yamlPropName:string;
    private val:string;

    firstValue:string;
    secondValue:string;
    whitelist:Whitelist;

    defaultValue: string;
    
    constructor(propName:string,defaultValue:string,whitelist:Whitelist,file:FileModel){
        if(whitelist.size()!=2){
            throw new Error(`Booleanproperty can only have exactly two values but ${whitelist.size()} were provided`);
        }
        if(!(whitelist.contains(defaultValue))){
            throw new Error(`Defaultvalue is not a valid value ${defaultValue}, ${whitelist.toString()}`);
        }

        this.whitelist = whitelist;
        this.yamlPropName = propName;
        this.defaultValue = defaultValue;
        this.firstValue = whitelist.toArray()[0];
        this.secondValue = whitelist.toArray()[1];
        this.file = file;
    }

    async setValue(val: string): Promise<void> {
        if(this.whitelist.contains(val)){
            this.file.setYAMLProperty(this.yamlPropName,val);
        }
        else{
            console.error(`Can't adjust to value '${val}' as it is not part of ${this.whitelist.toString()}`)
        }
    }
    getValue(): string {
       if(this.val===undefined){
            const val = this.file.getYAMLProperty(this.yamlPropName);
            if(val===null){
                this.val = this.defaultValue;
            }
            else{
                this.val = val;
            }
       }
       return this.val;
    }

    getNewToggleValue(currentValue:string):string{
        if(currentValue==this.firstValue){
            return this.secondValue;
        }
        else if(currentValue==this.secondValue){
            return this.firstValue;
        }
        else{
            return this.defaultValue;
        }
    }
}