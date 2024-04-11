import { FolderModel } from "./Interfaces/FolderModel";
import { isFileModel, isFolderModel } from "./Interfaces/Resource";

export class FolderList{
   
    static getFoldersAsStrings(rootFolder:FolderModel):string[]{
        const folders = FolderList.getFolders(rootFolder);
        let result:string[] = [];
        folders.forEach(f => {
            result.push(f.path);
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
}