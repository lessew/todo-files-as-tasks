import { App } from "obsidian";
import { TaskFactory } from "./configuration/TaskFactory";
import { YAMLParser } from "src/core/YAMLParser";
import { ObsidianWrapper } from "./obsidian/ObsidianWrapper";
import { TaskBuilder } from "src/core/TaskBuilder";
import { ObsidianTaskListView } from "./ui/ObsidianTaskListView";
import { FileListDAO } from "src/core/Interfaces/FileListDAO";
import { FileList } from "./obsidian/FileList";
import { FolderList } from "./obsidian/FolderList";



export class Main{
    static async run(source:string,el:HTMLElement,app:App):Promise<void>{

        const parser:YAMLParser = new YAMLParser(source);
        const rootPath:string = parser.parseRootPath();

        // load obsidianwrapper so that other objects can access the obsidianapp
        ObsidianWrapper.init(app,rootPath); 

        // load files and folders from obsidian / filesystem
        const folderList = new FolderList();
        await folderList.init(rootPath);

        const fileList = new FileList();
        await fileList.init(rootPath,folderList);
      
        const action = parser.parseAction();
        if(action==YAMLParser.ACTION_LIST){
            setTimeout(() => {
                const properties = TaskFactory.getProperties(rootPath,folderList);
                const filters = parser.parseFilters(properties);
                const files = fileList.files;
                const taskBuilder = new TaskBuilder(files);
                const filteredFiles = taskBuilder.bulkFilterBy(filters).get();
                const view = new ObsidianTaskListView(filteredFiles,ObsidianWrapper.getInstance().obsidianApp);
                view.build(el);
            },1250)
            
        }
    }
}