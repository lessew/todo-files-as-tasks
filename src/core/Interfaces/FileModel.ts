import { FolderList } from "src/main/obsidian/FolderList";
import { File } from "../File";

export interface FileModel{
    createMarkdownFile(path:string):void;
}