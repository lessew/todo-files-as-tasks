import { FileAsTaskFactory } from "src/main/FileAsTaskFactory";
import { FileAsTask } from "./FileAsTask";
import { Settings } from "./FileAsTaskSettings";
import { FileModel } from "./FileModel";
import { Whitelist } from "./Whitelist";

export abstract class FolderModel{
    name:string;
    extension:string;
    path:string;
    children:(FileModel | FolderModel)[];

    constructor(){ // use constructor in obsidianfolder class to load 

    }


    getFilesAsTasks(settings:Settings):FileAsTask[]{
        let result:FileAsTask[] = [];
        this.children.forEach(child => {
            if(FolderModel.isFolderModel(child)){
                result = [...result,...child.getFilesAsTasks(settings)];
            }
            else if(FileModel.isFileModel(child)){
                let newFileAsTask = FileAsTaskFactory.loadFileAsTask(child,settings);
                result.push(newFileAsTask);
            }
        })
        return result;
    }

    getFolders(rootFolder:FolderModel):FolderModel[]{
        return [];
        /*
        let result:FolderModel[] = [];
        
        rootFolder.children.forEach((resource) => {
            if(FileModel.isFileModel(resource)){
                // nothin'
            }
            else if(FolderModel.isFolderModel(resource)){
                result.push(resource);
                result = [...result,...this.getFolders(resource)];
            }
        })
        return result; 
        */
    }

    getFoldersAsWhitelist(rootFolder:FolderModel):Whitelist{
        return new Whitelist([]);
        /*
        const folders = FolderList.getFolderNamesAsStrings(rootFolder);
        let wl = new Whitelist(folders);
        return wl;
        */
    }

    static isFolderModel(r:FileModel | FolderModel): r is FolderModel{
        return 'children' in r;
    }
}