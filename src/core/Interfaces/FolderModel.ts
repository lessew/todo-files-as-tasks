import { FileModel } from "./FileModel";

export abstract class FolderModel{
    name:string;
    path:string;
    children:(FileModel | FolderModel)[];

    constructor(){ // use constructor in obsidianfolder class to load 

    }

    getFiles():FileModel[]{
        let result:FileModel[] = [];
        this.children.forEach(child => {
            if(FolderModel.isFolderModel(child)){
                result = [...result,...child.getFiles()];
            }
            else if(FileModel.isFileModel(child)){
                result.push(child);
            }
        });
        return result;
    }
    
    getFolders():FolderModel[]{       
        let result:FolderModel[] = [];
        
        this.children.forEach((resource) => {
            if(FileModel.isFileModel(resource)){
                // nothin'
            }
            else if(FolderModel.isFolderModel(resource)){
                result.push(resource);
                result = [...result,...resource.getFolders()];
            }
        })
        return result; 
        
    }

    static isFolderModel(r:FileModel | FolderModel): r is FolderModel{
        return 'children' in r;
    }
}