import * as yaml from 'js-yaml'
import { Filter, FilterOperator } from './Interfaces/Filter';
import { YAMLParseError,RootPathError, ActionParseError, FilterNotAllowedError } from './Error';
import { PropertySettings, PropertyType, Settings } from './FileAsTaskSettings';
import { Property } from './Interfaces/Property';

export class YAMLParser{
    source:string;
    yaml:unknown;
    static ACTION_LIST = "list";
    static ACTION_CREATE_BUTTON = "create_button";
    static ACTION_TEST = "test"
    static EXCLUDE_TOKEN = "not ";

    loadSource(source:string):true | YAMLParseError{
        this.source = source;
        try{
            this.yaml = yaml.load(source);
            return true;
        }
        catch(e){
            return new YAMLParseError(`Error: not valid YAML: ${e.message}`);
        }
    }

    parseRootPath():string | RootPathError{
        try{
            const rp:string = (this.yaml as{rootPath:string}).rootPath;
            return rp;
        }
        catch(e){
            return new RootPathError("Could not parse rootpath: yaml variable not found")
        }
    }

    parseAction():string | ActionParseError{
        if(this.source.indexOf(YAMLParser.ACTION_CREATE_BUTTON)>-1){
            return YAMLParser.ACTION_CREATE_BUTTON;
        }
        else if(this.source.indexOf(YAMLParser.ACTION_LIST) > -1){
            return YAMLParser.ACTION_LIST;
        }
        else if(this.source.indexOf(YAMLParser.ACTION_TEST) > -1){
            return YAMLParser.ACTION_TEST;
        }
        else{
            return new ActionParseError("Action not specified, add either 'list' or 'create_button'")
        }
    }
   
    parseFilters(settings:Settings):Filter[] | FilterNotAllowedError{
        let result:Filter[] = [];

        for(const settingsKey in settings){            
            const yaml = this.yaml as any;
            if(settingsKey in yaml){
                const filterValue:string = yaml[settingsKey];
                let valop = this.parseOperator(filterValue);
                const allowedValues = settings[settingsKey as PropertyType].whitelist;

                if(typeof allowedValues !== "undefined" && !allowedValues.contains(valop.value)){
                    return new FilterNotAllowedError(`${valop.value} is not set as an allowed value for ${settingsKey}`)
                }

                if(typeof allowedValues === "undefined" || allowedValues.contains(valop.value)){
                    let r = {
                        propertySettings:settings[settingsKey as PropertyType],
                        propertyValue:valop.value,
                        operator:valop.operator
                    }
                    result.push(r)
                }
            }
        }
        return result;
    }

    parseOperator(val:string):{operator:FilterOperator,value:string}{
        let operator = FilterOperator.include;
        let resultValue = val;
        if(val.startsWith(YAMLParser.EXCLUDE_TOKEN)){
            operator = FilterOperator.exclude
            resultValue = val.substring(YAMLParser.EXCLUDE_TOKEN.length,val.length).trim();
        }
        return {
            operator:operator,
            value:resultValue.trim()
        }
    }
}

