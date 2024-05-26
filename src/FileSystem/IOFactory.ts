import { Directory } from "./Directory";
import { File } from "./File";

export interface IOFactory{
    createFile(root:string,path:string):File;
    createDirectory(root:string,path:string):Directory;
    isDirectory(input:File|Directory):input is Directory;
    isFile(input:File|Directory):input is File;
}