import { App } from "obsidian";
import { Task } from "./configuration/Task";
import { YAMLParser } from "src/core/YAMLParser";
import { ObsidianWrapper } from "./obsidian/ObsidianWrapper";
import { TaskListView } from "./ui/TaskListView";
import { FileList } from "./obsidian/FileList";
import { FolderList } from "./obsidian/FolderList";
import { CreateTaskButtonView } from "./ui/CreateTaskButtonView";
import { YaTodoPluginSettings } from "src/core/Interfaces/Settings";
import { FileFilter } from "src/core/FileFilter";



export class Main{
    static  run(source:string,el:HTMLElement,settings:YaTodoPluginSettings,app:App):void{

        const parser:YAMLParser = new YAMLParser(source);
        const rootPath:string = parser.parseRootPath();

        // load obsidianwrapper so that other objects can access the obsidianapp
        ObsidianWrapper.init(app,rootPath); 

        // load files and folders from obsidian / filesystem
        const folderList = new FolderList();
        folderList.init(rootPath);

        const fileList = new FileList();
        fileList.init(rootPath,settings,folderList);
      
        const action = parser.parseAction();
        if(action==YAMLParser.ACTION_LIST){
            const properties = Task.getProperties(rootPath,settings,folderList);
            const filters = parser.parseFilters(properties);
            const files = fileList.files;
            const fileFilter = new FileFilter(files);
            const filteredFiles = fileFilter.bulkFilterBy(filters).get();
            const view = new TaskListView(filteredFiles,ObsidianWrapper.getInstance().obsidianApp);
            view.build(el);
        }
        else if(action==YAMLParser.ACTION_CREATE_BUTTON){
            const view = new CreateTaskButtonView(app,folderList);
            view.build(el);
        }
    }
}