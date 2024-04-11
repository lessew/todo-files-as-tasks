import { FolderModel } from "./FolderModel";

export interface FileModel{
    name:string;
    path:string;
    parent:FolderModel;

    setFullPath(newPath:string):Promise<void> | void;
    getYAMLProperty(name:string):string;
    setYAMLProperty(name:string,value:string):Promise<void> | void;

    createMarkdownFile(path:string):void;
}