import { File } from "../../FileSystem/File";
import { Property } from "../Property";
import { Whitelist } from "../Whitelist";

export class BooleanYAMLProperty implements Property{
    file: File;
    propName:string;
    private val:string;

    firstValue:string;
    secondValue:string;
    whitelist:Whitelist;

    defaultValue: string;
    
    constructor(propName:string,defaultValue:string,whitelist:Whitelist,file:File){
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
            await this.file.setYAMLProperty(this.propName,val);
        }
        else{
            //console.log(`Can't adjust to value '${val}' as it is not part of ${this.whitelist.toString()}`)
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
                //this.val = this.defaultValue;
                this.val = val; // TODO fix this case; what to do when save value is not part of whitelst
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

    async toggle():Promise<void>{
        let curval = this.getValue();
        let newval = this.getNewToggleValue(curval);
        await this.setValue(newval);
    }
}