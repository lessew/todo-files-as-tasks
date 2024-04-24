import { FileModel } from "../../Interfaces/FileModel";
import { Property } from "../../Interfaces/Property";
import { Whitelist } from "../../Whitelist";

export class BooleanYAMLProperty implements Property{
    file: FileModel;
    propName:string;
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
        this.propName = propName;
        this.defaultValue = defaultValue;
        this.firstValue = whitelist.toArray()[0];
        this.secondValue = whitelist.toArray()[1];
        this.file = file;
    }

    async setValue(val: string): Promise<void> {
        if(this.whitelist.contains(val)){
            this.file.setYAMLProperty(this.propName,val);
        }
        else{
            console.error(`Can't adjust to value '${val}' as it is not part of ${this.whitelist.toString()}`)
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