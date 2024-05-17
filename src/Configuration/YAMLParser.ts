import * as yaml from 'js-yaml'
import { Filter, FilterOperator } from '../FileSystem/Filter';
import { FATError } from '../Error';
import { PluginSettings } from './PluginSettings';

// TODO : use Obsidian YAML parser functions
export class YAMLParser{
    source:string;
    yaml:unknown;
    // TODO: prepend all with TOKEN_
    static ACTION_LIST = "list";
    static ACTION_CREATE_BUTTON = "create_button";
    static ACTION_TEST = "test"
    static EXCLUDE_TOKEN = "not ";
    static TOKEN_ROOTPATH = "rootPath" as const;

    loadSource(source:string):true | FATError{
        this.source = source;
        try{
            this.yaml = yaml.load(source);
            return true;
        }
        catch(e){
            return new FATError(`Error: not valid YAML: ${e.message}`);
        }
    }

    parseRootPath():string | FATError{
        try{
            const rp:string = (this.yaml as{[YAMLParser.TOKEN_ROOTPATH]:string}).rootPath;
            return rp;
        }
        catch(e){
            return new FATError("Could not parse rootpath: yaml variable not found")
        }
    }

    parseAction():string | FATError{
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
            return new FATError("Action not specified, add either 'list' or 'create_button'")
        }
    }
   
    parseFilters(settings:PluginSettings):Filter[] | FATError{
        let result:Filter[] = [];
        let fail:FATError;

        let map = settings.getAsMap();
        for(let key of Array.from( map.keys()) ) {
            let aPropSetting = map.get(key)!;
            const yaml = this.yaml as any;
            if(aPropSetting.propName in yaml){
                const filterValue:string = yaml[aPropSetting.propName];
                let valop = this.parseOperator(filterValue);
                const whitelist = aPropSetting.whitelist;
                if((whitelist === undefined || whitelist.contains(valop.value))){
                    let r:Filter = new Filter(aPropSetting.propName,valop.value,valop.operator);
                    result.push(r);
                }
                else{
                    return new FATError(`${valop.value} is not set as an allowed value for ${aPropSetting.propName}`)
                }
            }
        };        
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

