import { FileAsTask } from "../FileAsTask/FileAsTask";
import { Filter, FilterOperator } from "./Filter";
import { PluginSettings } from "../Configuration/PluginSettings";
import { Directory } from "src/FileSystem/Directory";
import { File } from "src/FileSystem/File";
import { YAMLStrategy } from "./PropertyStrategies/YAMLStrategy";

export class FileAsTaskCollection{
    private rootDirectory:Directory;
    private filesAsTask:FileAsTask[];
    private settings:PluginSettings;
    private filters:Filter[];
    private yamlStrategies:Map<string,YAMLStrategy>;
    
    constructor(rf:Directory,strats:Map<string,YAMLStrategy>){
        this.rootDirectory = rf;
        this.yamlStrategies = strats;
        this.loadFilesAsTask();
        this.filters = [];
    }

    private loadFilesAsTask(){
        const files:File[] = this.rootDirectory.getFiles();
        let fats:FileAsTask[] = [];

        files.forEach(aFile => {
            let fat:FileAsTask = new FileAsTask(aFile,this.yamlStrategies);
            fats.push(fat);
        })
        this.filesAsTask = fats;
    }

    getRootDirectory():Directory{
        return this.rootDirectory;
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