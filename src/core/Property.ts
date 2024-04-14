import { FileModel } from "./Interfaces/FileModel";
import { PropertyStrategy } from "./Interfaces/PropertyStrategy";


export abstract class Property{
    file:FileModel;
    constructor(file:FileModel){
        this.file = file;
    }
    abstract getValue():string;
    abstract setValue(val:string):Promise<void>;
}

