import { FolderModel } from "./FolderModel";

export abstract class FileModel{
    name:string;
    path:string;
    root:string;

    abstract move(newPath:string):Promise<void> | void;
    abstract getYAMLProperty(name:string):string | null;
    abstract setYAMLProperty(name:string,value:string):Promise<void> | void;
    //abstract createMarkdownFile(root:string,path:string):Promise<FileModel>;

    static isFileModel(r:FileModel | FolderModel): r is FileModel{
        return !('children' in r);
    }
}

 