import { PropertySettings } from "src/core/PropertySettings";
import { YAMLStrategy } from "../YAMLStrategy";

export class BooleanStrategy extends YAMLStrategy{

    firstValue:string;
    secondValue:string;

    constructor(settings:PropertySettings){
        super(settings);
        if(settings.allowedValues?.length!=2){
            throw new Error(`Booleanproperty can only have exactly two values but ${settings.allowedValues?.length} were provided`);
        }
        if(!(settings.allowedValues.includes(settings.defaultValue))){
            throw new Error(`Defaultvalue is not a valid value ${settings.defaultValue}, ${settings.allowedValues}`);
        }

        this.firstValue = settings.allowedValues![0];
        this.secondValue = settings.allowedValues![1];
    }
  
    getNewToggleValue(currentValue:string):string{
        if(currentValue==this.firstValue){
            return this.secondValue;
        }
        else if(currentValue==this.secondValue){
            return this.firstValue;
        }
        else{
            return this.settings.defaultValue;
        }
    }
}