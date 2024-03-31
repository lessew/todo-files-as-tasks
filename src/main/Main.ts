import { App } from "obsidian";
import { FATSettings } from "./FileAsTask";
import { YAMLParser } from "src/core/YAMLParser";
import { ObsidianWrapper } from "./obsidian/ObsidianWrapper";
import { TaskListView } from "./ui/TaskListView";
import { FileList } from "./obsidian/FileList";
import { FolderList } from "./obsidian/FolderList";
import { CreateTaskButtonView } from "./ui/CreateTaskButtonView";
import { FileFilter } from "src/core/FileFilter";



export class Main{
    static  run(source:string,el:HTMLElement,settings:FATSettings,app:App):void{

        const parser:YAMLParser = new YAMLParser(source);
        const rootPath:string = parser.parseRootPath();

        // load obsidianwrapper so that other objects can access the obsidianapp
        ObsidianWrapper.init(app,rootPath); 

        // load files and folders from obsidian / filesystem
        const folderList = new FolderList();
        folderList.init(rootPath);
        settings.project.allowedValues = folderList.folders;

        const action = parser.parseAction();
        if(action==YAMLParser.ACTION_LIST){
           Main.displayActionList(el,parser,rootPath,settings,folderList)
        }
        else if(action==YAMLParser.ACTION_CREATE_BUTTON){
           Main.displayCreateTaskButton(el,app,folderList)
        }
    }

    static displayActionList(el:HTMLElement,parser:YAMLParser,rootPath:string,settings:FATSettings,folderList:FolderList):void{
        const fileList = new FileList();
        fileList.init(rootPath,settings);

        //const properties = Task.getProperties(rootPath,settings,folderList);
        const filters = parser.parseFilters(settings);
        const files = fileList.files;
        const fileFilter = new FileFilter(files);
        const filteredFiles = fileFilter.bulkFilterBy(filters).get();
        const view = new TaskListView(filteredFiles,ObsidianWrapper.getInstance().obsidianApp);
        view.build(el);
    }

    static displayCreateTaskButton(el:HTMLElement,obsidianApp:App,folderList:FolderList):void{
        const view = new CreateTaskButtonView(obsidianApp,folderList);
        view.build(el);
    }
}