

//TODO allow for subfolders
export interface FolderListDAO{
    folders:string[];
    init(folderPath:string):void;
}