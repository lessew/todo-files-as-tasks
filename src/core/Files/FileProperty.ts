import { File } from "./File";

export interface FileProperty{
    name:string;
    value:string;
    file:File;
    matches(needle:string):boolean;
}

export abstract class AbstractFileProperty implements FileProperty{
    file:File;
    name:string;
    abstract value:string;

    constructor(f:File,name:string,options?:any){
        this.file = f;
        this.name = name;
        return this;
    }

    abstract matches(needle:string):boolean;
}

