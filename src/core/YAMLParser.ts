import * as yaml from 'js-yaml'
import { FileSystemFacade } from './Files/FileSystemFacade';
import { FileProperty } from './Files/FileProperty';
import { TaskBuilder } from './TaskBuilder';
import { File } from './Files/File';
import { Task } from 'src/main/configuration/Task';

export class YAMLParser{
    source:string;
    yaml:unknown;
    fileProperties:Record<string,FileProperty>;
    static DEFAULT_ROOT = "./";

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

    setFilePropertiesToParse(fileProperties:Record<string,FileProperty>):void{
        this.fileProperties = fileProperties;
    }

    getRootPath():string{
        try{
            const rp:string = (this.yaml as{rootPath:string}).rootPath;
            return rp;
        }
        catch(e){
            return YAMLParser.DEFAULT_ROOT; 
        }
    }
   
    parse():{propertyName:string,propertyValue:string}[]{
        let result:{propertyName:string,propertyValue:string}[] = [];

        for(const propertyName in this.fileProperties){
            const property:FileProperty = this.fileProperties[propertyName];

            const yaml = this.yaml as any;

            if(propertyName in yaml){
                const filterValue:string = yaml[propertyName];
                result.push({propertyName:propertyName,propertyValue:filterValue})
            }
        }
        return result;
    }
}