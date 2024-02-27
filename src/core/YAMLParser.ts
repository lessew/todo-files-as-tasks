import { Query } from "./Query";
import * as yaml from 'js-yaml'
import { ValidContextValues, ValidStatusValues } from "./FilePropertyValues";
import { TaskConfiguration } from "./TaskConfiguration";


/**
 * Todo: improve error handling. right now a default query is returned with rootpath .
 * Must find a way to gracefully report back to user where the typo sits
 **/ 
export class YAMLParser{
    config:TaskConfiguration;
    source:string;

    constructor(){
    }

    loadSource(s:string){
        this.source = s;
    }

    loadConfiguration(c:TaskConfiguration){
        this.config = c;
    }

    parseRootPath():string{
        try{
            const data = yaml.load(this.source) as {rootPath:string};
            return data.rootPath;
        }
        catch(e){
            return ".";           
        }
    }

    parse():Query{
        try{
            const data:Query = yaml.load(this.source) as Query;

            if(data.context && !(this.config.validContextValues.isSet(data.context))){
                throw Error(`Error: Context field is invalid. Value read: ${data.context}`)
            }

            if(data.status && !(this.config.validStatusValues.isSet(data.status))){
                throw Error(`Error: Status field is invalid. Value read: ${data.context}`)
            }

            if(data.starred && !(this.config.validStarredValues.isSet(data.starred))){
                throw Error(`Error: Starred field is invalid. Value read: ${data.starred}`)
            }

            return data;
        }
        catch(e){
            //console.error(`Error with parsing data: ${source}`);
            return {
                rootPath: "."
            } as Query;
        }
    }
}