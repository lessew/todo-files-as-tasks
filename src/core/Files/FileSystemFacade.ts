import { File } from "./File";

export interface FileSystemFacade {
    getMarkdownFiles(path:string):File[];
    getFolders(path:string):string[];
    createMarkdownFile(path:string):Promise<File>;
    normalizePath(path:string):string;
    move(file:File,newFullPath: string): void;
    getYAMLProperty(file:File,name:string): string;
    setYAMLProperty(file:File,name: string, value: string):void;
}