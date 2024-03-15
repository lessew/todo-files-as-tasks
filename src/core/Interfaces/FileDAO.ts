import { File } from "../core-module";

export interface FileDAO{
    createMarkdownFile(path:string):Promise<File>;
}