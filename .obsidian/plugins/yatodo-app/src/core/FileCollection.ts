import { File } from "./File";

export interface FileCollection{
    rootPath:string | false;
    files:File[];
}

