import { FolderModel } from "./Interfaces/FolderModel";
import { isFileModel, isFolderModel } from "./Interfaces/Resource";
import { Whitelist } from "./Whitelist";

export class FolderList{
   
    static getFolderNamesAsStrings(rootFolder:FolderModel):string[]{
        const folders = FolderList.getFolders(rootFolder);
        let result:string[] = [];
        folders.forEach(f => {
            result.push(f.name);
        })
        return result;
    }

    static getFolders(rootFolder:FolderModel):FolderModel[]{
        let result:FolderModel[] = [];
        
        rootFolder.children.forEach((resource) => {
            if(isFileModel(resource)){
                // nothin'
            }
            else if(isFolderModel(resource)){
                result.push(resource);
                result = [...result,...FolderList.getFolders(resource)];
            }
        })
        return result; 
    }

    static getFoldersAsWhitelist(rootFolder:FolderModel):Whitelist{
        const folders = FolderList.getFolderNamesAsStrings(rootFolder);
        let wl = new Whitelist(folders);
        return wl;
    }
}