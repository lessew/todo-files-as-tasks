import { PropertyFactory } from "src/FileAsTask/PropertyFactory";
import { Whitelist } from "src/FileAsTask/PropertyStrategies/Whitelist";
import { YAMLStrategy } from "src/FileAsTask/PropertyStrategies/YAMLStrategy";

type SavedProp = {
        propName:string,
        defaultValue:string,
        whitelist?:string[],
        strategy:string
}

type SavedSettings = {
    properties: SavedProp[]
}

/**
 * Include saveto and loadfrom to load/save to persistent obsidian storage
 * Defaultvalues are kept seperate from the strategies to keep them clean / functional / relatively stateless
 * 
 */
export class PluginSettings {
    
    yamlPropertyStrategies:Map<string,string>; // corresponds to getType() method in yamlstrategies.
    propertyDefaults:Map<string,string>;
    propertyWhitelists:Map<string,Whitelist>;

    constructor(){
        this.yamlPropertyStrategies = new Map<string,string>();
        this.propertyDefaults = new Map<string,string>();
    }

    addYAMLproperty(propName:string,defaultValue:string,strategy:string):PluginSettings{
        this.yamlPropertyStrategies.set(propName,strategy);
        this.propertyDefaults.set(propName,defaultValue);
        return this;
    }

    getYAMLStrategy(name:string):string{
        let s = this.yamlPropertyStrategies.get(name);
        if(s==undefined){
            throw Error(`Setting does not exist ${name}`)
        }
        return s;
    }

    toJSON():string{
        let result:SavedProp[] = [];

        this.yamlPropertyStrategies.forEach((key,value) => {
            let propSet:SavedProp = {
                propName: key,
                defaultValue: this.propertyDefaults.get(key)!,
                strategy: value
            }
            result.push(propSet);
        })

        return JSON.stringify({properties:result});
    }

    fromJSON(inputStr:string):void{
        let input = JSON.parse(inputStr);
        let properties = input.properties as SavedProp[];
        properties.forEach((aProp) => {
            this.addYAMLproperty(aProp.propName,aProp.defaultValue,aProp.strategy)
        });
    }

    getDefault(propName:string):string{
        return this.propertyDefaults.get(propName)!;
    }
}





