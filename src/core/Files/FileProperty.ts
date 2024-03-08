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
    static INVALID_VALUE:string ="-invalid_value-";
    abstract value:string;

    constructor(f:File,name:string){
        this.file = f;
        this.name = name;
        return this;
    }

    abstract matches(needle:string):boolean;
}

