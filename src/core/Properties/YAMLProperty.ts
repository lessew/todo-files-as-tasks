import { FileModel } from "../Interfaces/FileModel";
import { Property } from "../Property";
import { YAMLStrategy } from "../PropertyStrategies/YAMLStrategy";

export class YAMLProperty extends Property{
    name:string;
    strategy:YAMLStrategy;

    constructor(propName:string,strat:YAMLStrategy,file:FileModel){
        super(file);
        this.name = propName;
        this.strategy = strat;
    }

    getValue():string{
        return this.file.getYAMLProperty(this.name);
    }

    async setValue(val: string): Promise<void> {
        if(this.validate(val)){
            await this.file.setYAMLProperty(this.name,val);
        }
    }

    private validate(val:string):boolean{
        //return this.strategy.validate(val);
    }
}