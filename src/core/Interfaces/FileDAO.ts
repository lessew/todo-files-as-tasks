import { File } from "../File";

export interface FileDAO{
    createMarkdownFile(path:string):Promise<File>;
}