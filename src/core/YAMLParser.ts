import * as yaml from 'js-yaml'
import { Filter, FilterOperator } from './Interfaces/Filter';
import { FATProperty, FATSettings } from 'src/main/FileAsTaskSettings';
import { FATError,YAMLParseError,RootPathError, ActionParseError } from './Error';


// TODO change rootPath to a more non tech friendly name
// TODO replace static const with types
export class YAMLParser{
    source:string;
    yaml:unknown;
    static ACTION_LIST = "list";
    static ACTION_CREATE_BUTTON = "create_button";
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
        else{
            return new ActionParseError("Action not specified, add either 'list' or 'create_button'")
        }
    }
   
    parseFilters(settings:FATSettings):Filter[]{
        let result:Filter[] = [];

        for(const propertyName in settings){            
            const yaml = this.yaml as any;
            if(propertyName in yaml){
                const filterValue:string = yaml[propertyName];
                let valop = this.parseOperator(filterValue);
                const allowedValues = settings[propertyName as FATProperty].allowedValues;
                if(typeof allowedValues === "undefined" || allowedValues.includes(valop.value)){
                    result.push({
                        propertyName:propertyName,
                        propertyValue:valop.value,
                        operator:valop.operator
                    })
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

