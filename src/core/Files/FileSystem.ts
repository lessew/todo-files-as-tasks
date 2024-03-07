import { File } from "./File";

export abstract class FileSystem {
    abstract getMarkdownFiles(path:string):File[];
    abstract getFolders(path:string):string[];
    abstract createMarkdownFile(path:string):Promise<File>;
    abstract normalizePath(path:string):string;
    abstract move(file:File,newFullPath: string): void;
    abstract getYAMLProperty(file:File,name:string): string;
    abstract setYAMLProperty(file:File,name: string, value: string):void;
}