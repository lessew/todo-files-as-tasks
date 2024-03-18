import { FolderList } from "src/main/obsidian/FolderList";
import { File } from "../File";

export interface FileDAO{
    createMarkdownFile(path:string,folderList:FolderList):void;
}