import { FolderList } from "src/main/obsidian/FolderList";
import { File } from "../File";

export interface FileListDAO{
    files:File[];
    init(rootPath:string,folderList:FolderList):void;
}