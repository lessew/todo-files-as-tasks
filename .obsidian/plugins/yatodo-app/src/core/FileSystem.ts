import { File } from "./File";

export abstract class FileSystem {
    abstract getMarkdownFiles():File[];
    abstract getFolders():string[];
}