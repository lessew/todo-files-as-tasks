import { File } from "./File";

export abstract class FileSystem {
    rootPath:string;
    abstract getMarkdownFiles():File[];
    abstract getFolders():string[];
    abstract createMarkdownFile(path:string):Promise<File>;

}