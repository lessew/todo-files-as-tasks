import * as yaml from 'js-yaml'
import { FileSystemFacade } from './Files/FileSystemFacade';
import { FileProperty } from './AbstractProperty';
import { TaskBuilder } from './TaskBuilder';
import { File } from './File';
import { Task } from 'src/main/configuration/Task';

export class YAMLParser{
    source:string;
    yaml:unknown;
    static DEFAULT_ROOT = "./";
    static ACTION_LIST = "list";
    static ACTION_CREATE_BUTTON = "create_button";

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
        return YAMLParser.ACTION_LIST;
    }
   
    parseFilters(properties:Record<string,FileProperty):{propertyName:string,propertyValue:string}[]{
        let result:{propertyName:string,propertyValue:string}[] = [];

        for(const propertyName in properties){
            const property:FileProperty = properties[propertyName];

            const yaml = this.yaml as any;

            if(propertyName in yaml){
                const filterValue:string = yaml[propertyName];
                result.push({propertyName:propertyName,propertyValue:filterValue})
            }
        }
        return result;
    }
}