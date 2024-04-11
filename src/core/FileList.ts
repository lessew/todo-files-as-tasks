import { FATSettings } from "./FileAsTaskSettings";
import { FolderModel } from "./Interfaces/FolderModel";
import { isFileModel, isFolderModel } from "./Interfaces/Resource";
import { FileAsTask } from "src/main/FileAsTask";

export class FileList{
    
    static getFilesAsTasks(rf:FolderModel,settings:FATSettings):FileAsTask[]{
        let result:FileAsTask[] = [];
        rf.children.forEach(child => {
            if(isFolderModel(child)){
                result = [...result,...FileList.getFilesAsTasks(child,settings)];
            }
            else if(isFileModel(child)){
                let newFileAsTask = new FileAsTask(child,settings);
                result.push(newFileAsTask);
            }
        })
        return result;
    }
}