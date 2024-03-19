import { App } from "obsidian";
import { TaskFactory } from "./configuration/TaskFactory";
import { YAMLParser } from "src/core/YAMLParser";
import { ObsidianWrapper } from "./obsidian/ObsidianWrapper";
import { TaskBuilder } from "src/core/TaskBuilder";
import { TaskListView } from "./ui/TaskListView";
import { FileList } from "./obsidian/FileList";
import { FolderList } from "./obsidian/FolderList";
import { reateTaskButtonView } from "./ui/CreateTaskButtonView";



export class Main{
    static  run(source:string,el:HTMLElement,app:App):void{

        const parser:YAMLParser = new YAMLParser(source);
        const rootPath:string = parser.parseRootPath();

        // load obsidianwrapper so that other objects can access the obsidianapp
        ObsidianWrapper.init(app,rootPath); 

        // load files and folders from obsidian / filesystem
        const folderList = new FolderList();
        folderList.init(rootPath);

        const fileList = new FileList();
        fileList.init(rootPath,folderList);
      
        const action = parser.parseAction();
        if(action==YAMLParser.ACTION_LIST){
            const properties = TaskFactory.getProperties(rootPath,folderList);
            const filters = parser.parseFilters(properties);
            const files = fileList.files;
            const taskBuilder = new TaskBuilder(files);
            const filteredFiles = taskBuilder.bulkFilterBy(filters).get();
            const view = new TaskListView(filteredFiles,ObsidianWrapper.getInstance().obsidianApp);
            view.build(el);
        }
        else if(action==YAMLParser.ACTION_CREATE_BUTTON){
            const view = new CreateTaskButtonView(app,folderList);
            view.build(el);
        }
    }
}