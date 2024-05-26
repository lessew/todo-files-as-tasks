import { File } from "../FileSystem/File";

export interface Property{
    propName:string;
    defaultValue:string;
    file:File;
    setValue(val:string):Promise<void>;
    getValue():string;
}
