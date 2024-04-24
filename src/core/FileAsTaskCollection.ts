import { FileAsTask } from "./FileAsTask";
import { FileModel } from "./Interfaces/FileModel";
import { Filter } from "./Filter";
import { FolderModel } from "./Interfaces/FolderModel";
import { Settings } from "./Settings";



export class FileAsTaskCollection{
    private rootFolder:FolderModel;
    private filesAsTask:FileAsTask[];
    private settings:Settings;
    
    constructor(rf:FolderModel,settings:Settings){
        this.rootFolder = rf;
        this.settings = settings;
        this.loadFilesAsTask();

    }

    private loadFilesAsTask(){
        const files:FileModel[] = this.rootFolder.getFiles();
        let fats:FileAsTask[] = [];

        files.forEach(aFile => {
            let fat:FileAsTask = new FileAsTask(aFile,this.settings);
            fats.push(fat);
        })
        this.filesAsTask = fats;
    }

    getRootFolder():FolderModel{
        return this.rootFolder;
    }

    filter(f:Filter):void{
        this.filesAsTask = [];
    }

    get():FileAsTask[]{
        return this.filesAsTask;
    }
}