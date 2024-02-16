import { File } from "./File";
import { Folder } from "./Folder";

export interface FileAndFolderCollection{
    rootPath:string | false;
    files:File[];
    folders:Folder[];
}

