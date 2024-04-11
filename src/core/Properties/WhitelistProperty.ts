import { PropertySettings } from "../PropertySettings";
import { Property } from "../Property";
import { PropertyModel } from "../Interfaces/PropertyModel";
import { FileModel } from "../Interfaces/FileModel";
import { FATProperty } from "../FileAsTaskSettings";

export abstract class WhitelistProperty extends Property{
    abstract getName():FATProperty;

    private value;
    settings:PropertySettings

    constructor(settings:PropertySettings,file:FileModel){
        super(file);
        this.value = this.file.getYAMLProperty(this.getName());
        this.settings = settings;
    }
    
    validate(newValue:string):boolean{
        return (this.settings.allowedValues?.indexOf(newValue) != -1)
    }

    getValue():string{
       return this.value;
    }
    
    async setValue(val: string):Promise<void> {
        if(this.validate(val)){
            await this.file.setYAMLProperty(this.name,val);
        }    
    }

}
