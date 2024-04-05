import * as yaml from 'js-yaml'
import { Filter, FilterOperator } from './Interfaces/Filter';
import { FATSettings } from 'src/main/FileAsTaskSettings';

// TODO change rootPath to a more non tech friendly name
// TODO replace static const with types
export class YAMLParser{
    source:string;
    yaml:unknown;
    static DEFAULT_ROOT = "./";
    static ACTION_LIST = "list";
    static ACTION_CREATE_BUTTON = "create_button";
    static EXCLUDE_TOKEN = "not ";

    constructor(source:string){
        this.source = source;
        try{
            this.yaml = yaml.load(source);
        }
        catch(e){
            this.yaml = {
                rootPath : YAMLParser.DEFAULT_ROOT
            }
        }
    }

    parseRootPath():string{
        try{
            const rp:string = (this.yaml as{rootPath:string}).rootPath;
            return rp;
        }
        catch(e){
            return YAMLParser.DEFAULT_ROOT; 
        }
    }

    parseAction():string{
        if(this.source.indexOf(YAMLParser.ACTION_CREATE_BUTTON)>-1){
            return YAMLParser.ACTION_CREATE_BUTTON;
        }
        return YAMLParser.ACTION_LIST;
    }
   
    parseFilters(settings:FATSettings):Filter[]{
        let result:Filter[] = [];

        for(const propertyName in settings){            
            const yaml = this.yaml as any;
            if(propertyName in yaml){
                const filterValue:string = yaml[propertyName];
                let valop = this.parseOperator(filterValue);
                result.push({
                    propertyName:propertyName,
                    propertyValue:valop.value,
                    operator:valop.operator
                })
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

