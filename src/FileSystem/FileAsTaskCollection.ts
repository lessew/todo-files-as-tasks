import { FileAsTask } from "./FileAsTask";
import { FileModel } from "./FileModel";
import { Filter, FilterOperator } from "./Filter";
import { FolderModel } from "./FolderModel";
import { PluginSettings } from "../Configuration/PluginSettings";



export class FileAsTaskCollection{
    private rootFolder:FolderModel;
    private filesAsTask:FileAsTask[];
    private settings:PluginSettings;
    private filters:Filter[];
    
    constructor(rf:FolderModel,settings:PluginSettings){
        this.rootFolder = rf;
        this.settings = settings;
        this.loadFilesAsTask();
        this.filters = [];
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

    filterBy(filter:Filter):FileAsTaskCollection{
        let filtered = this.filesAsTask.filter((aFile) => {
            const propertyValue:string = aFile.get(filter.propertyName);

            if(filter.operator==FilterOperator.exclude){
                return (propertyValue != filter.propertyValue)
            }
            else if(filter.operator==FilterOperator.include){
                return (propertyValue == filter.propertyValue)
            }
        })
        this.filesAsTask = filtered;
        this.filters.push(filter);
        return this;
    }

    bulkFilterBy(list:Filter[]):FileAsTaskCollection{
        list.forEach(filterBy => {
            this.filterBy(filterBy);
        });
        return this;
    }

    get():FileAsTask[]{
        return this.filesAsTask;
    }
}