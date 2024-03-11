import { File } from "./File";
import { FileSystemFacade } from "./FileSystemFacade";

export interface FileProperty{
    name:string;
    value:string;
    dao:FilePropertyDAO;
    matches(needle:string):boolean;
}

export interface FilePropertyDAO{
    fp:FileProperty;

    persist(val:string):void;
    retrieve():string;
}

export abstract class AbstractFileProperty implements FileProperty{
    name:string;
    dao:FilePropertyDAO;
    static INVALID_VALUE:string ="-invalid_value-";
    abstract value:string;

    constructor(name:string){
        this.name = name;
        return this;
    }

    setDAO(dao:FilePropertyDAO):void{
        this.dao = dao;
    }

    

    abstract matches(needle:string):boolean;
}

