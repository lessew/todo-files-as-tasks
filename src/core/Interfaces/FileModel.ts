import { FolderModel } from "./FolderModel";

export interface FileModel{
    name:string;
    path:string;
    //parent:FolderModel;

    move(newPath:string):Promise<void> | void;
    getYAMLProperty(name:string):string | null;
    setYAMLProperty(name:string,value:string):Promise<void> | void;

    createMarkdownFile(path:string):void;
}