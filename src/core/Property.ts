import { FileModel } from "./Interfaces/FileModel";


export abstract class Property{
    file:FileModel;
    constructor(file:FileModel){
        this.file = file;
    }
    abstract getValue():string;
    abstract setValue(val:string):Promise<void>;
    abstract validate(newValue:string):boolean;
}