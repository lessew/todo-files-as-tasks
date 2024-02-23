import { Query } from "./Query";
import { Parser } from "./Parser";
import * as yaml from 'js-yaml'
import { Context,Status } from "./FileProperties";


/**
 * Todo: improve error handling. right now a default query is returned with rootpath .
 * Must find a way to gracefully report back to user where the typo sits
 **/ 
export class YAMLParser extends Parser{
    parse(source:string):Query{
        try{
            const data:Query = yaml.load(source) as Query;

            if(data.context && !(this.contextValues.isSet(data.context))){
                throw Error(`Error: Context field is invalid. Value read: ${data.context}`)
            }

            if(data.status && !(this.statusValues.isSet(data.status))){
                throw Error(`Error: Status field is invalid. Value read: ${data.context}`)
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