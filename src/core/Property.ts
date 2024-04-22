import { FileModel } from "./FileModel";


export interface Property{
    defaultValue:string;
    file:FileModel;
    setValue(val:string):Promise<void>;
    getValue():string;
}
