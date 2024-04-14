import { PropertySettings } from "src/core/PropertySettings";
import { YAMLStrategy } from "../YAMLStrategy";

export class WhitelistStrategy extends YAMLStrategy{

    settings:PropertySettings;

    constructor(settings:PropertySettings){
        super(settings);

        if(!settings.allowedValues?.includes(settings.defaultValue)){
            throw new Error(`Defaultvalue is not a valid value ${settings.defaultValue}, ${settings.allowedValues}`);
        }
    }    

    
}