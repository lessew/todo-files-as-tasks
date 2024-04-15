import { FileAsTaskFactory } from "src/main/FileAsTaskFactory";
import { FileAsTask } from "./FileAsTask";
import { Settings } from "./FileAsTaskSettings";
import { FolderModel } from "./Interfaces/FolderModel";
import { isFileModel, isFolderModel } from "./Interfaces/Resource";

export class FileList{
    
    static getFilesAsTasks(rf:FolderModel,settings:Settings):FileAsTask[]{
        let result:FileAsTask[] = [];
        rf.children.forEach(child => {
            if(isFolderModel(child)){
                result = [...result,...FileList.getFilesAsTasks(child,settings)];
            }
            else if(isFileModel(child)){
                let newFileAsTask = FileAsTaskFactory.loadFileAsTask(child,settings);
                result.push(newFileAsTask);
            }
        })
        return result;
    }
}