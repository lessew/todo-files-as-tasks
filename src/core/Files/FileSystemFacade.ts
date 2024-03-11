import { File } from "./File";

export interface FileSystemFacade {
    rootPath:string;
    getMarkdownFiles():File[];
    getFolders():string[];
    createMarkdownFile(path:string):Promise<File>;
    normalizePath(path:string):string;
    move(file:File,newFullPath: string): void;
    getYAMLProperty(file:File,name:string): string;
    setYAMLProperty(file:File,name: string, value: string):void;
}