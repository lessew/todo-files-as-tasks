import { File } from "../core-module";

export interface FileListDAO{
    getMarkdownFiles(rootPath:string):File[];
}