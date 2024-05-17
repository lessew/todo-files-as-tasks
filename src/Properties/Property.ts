import { FileModel } from "../FileSystem/FileModel";

export interface Property{
    propName:string;
    defaultValue:string;
    file:FileModel;
    setValue(val:string):Promise<void>;
    getValue():string;
}
