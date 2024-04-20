import { FileAsTaskFactory } from "src/main/FileAsTaskFactory";
import { FileAsTask } from "./FileAsTask";
import { Settings } from "./FileAsTaskSettings";

export interface Resource{}

export abstract class FileModel implements Resource{
    name:string;
    path:string;

    abstract move(newPath:string):Promise<void> | void;
    abstract getYAMLProperty(name:string):string | null;
    abstract setYAMLProperty(name:string,value:string):Promise<void> | void;
    abstract createMarkdownFile(path:string):void;
}


export abstract class FolderModel implements Resource{
    name:string;
    extension:string;
    path:string;
    children:Resource[];

    getFilesAsTasks(settings:Settings):FileAsTask[]{
        let result:FileAsTask[] = [];
        this.children.forEach(child => {
            if(isFolderModel(child)){
                result = [...result,...child.getFilesAsTasks(settings)];
            }
            else if(isFileModel(child)){
                let newFileAsTask = FileAsTaskFactory.loadFileAsTask(child,settings);
                result.push(newFileAsTask);
            }
        })
        return result;
    }
}


function isFolderModel(r:Resource): r is FolderModel{
    return 'children' in r;
}

function isFileModel(r:Resource): r is FileModel{
    return !('children' in r);
}