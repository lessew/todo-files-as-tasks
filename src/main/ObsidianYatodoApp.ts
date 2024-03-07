import { App } from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { TaskList } from "src/core/TaskList";
import { ObsidianTaskListView } from "./ui/ObsidianTaskListView";
import { File } from "src/core/File";
import { FileSystem } from "src/core/FileSystem";
import { ValidContextValues,ValidProjectValues,ValidStarredValues,ValidStatusValues } from "src/core/FilePropertyValues";
import { ObsidianFileSystem } from "./ObsidianFileSystem";
import { TaskConfiguration } from "src/core/TaskConfiguration";
import { ObsidianCreateButtonView } from "./ui/ObsidianCreateButtonView";

export class ObsidianYatodoApp{
    parser:YAMLParser;
    obsidianApp:App; 
    
    constructor(obsidianApp:App){
        this.obsidianApp = obsidianApp;
    }

    executeCommand(source:string,el:HTMLElement):void{
        if(source.indexOf("create-todo-button")>-1){
            this.displayCreateTaskButton(source,el);
        }
        else{
            this.displayTaskList(source,el);
        }
    }

    displayCreateTaskButton(source:string,el:HTMLElement):void{

        const parser:YAMLParser = new YAMLParser();
        parser.loadSource(source);
        const rootPath = parser.parseRootPath();

        const fs = new ObsidianFileSystem(this.obsidianApp);
        fs.setRootPath(rootPath);
        console.log(fs);

        const view = new ObsidianCreateButtonView(fs,this.getConfiguration(fs),this.obsidianApp);
        view.build(el);
    }



    displayTaskList(source:string,el:HTMLElement):void{
        const parser:YAMLParser = new YAMLParser();
        parser.loadSource(source);
        const rootPath = parser.parseRootPath();

        const fs = new ObsidianFileSystem(this.obsidianApp);
        fs.setRootPath(rootPath);
        const files:File[] = fs.getMarkdownFiles();

        const config = this.getConfiguration(fs);

        parser.loadConfiguration(config);
        const query = parser.parse();

        let taskList:TaskList = new TaskList(files,query,config)
        
        const view = new ObsidianTaskListView(taskList,this.obsidianApp);

        view.build(el); 
    }
}