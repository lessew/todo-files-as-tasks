import { App } from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { ObsidianTaskListView } from "./ui/ObsidianTaskListView";
import { ObsidianCreateButtonView } from "./ui/ObsidianCreateButtonView";
import { Task } from "./configuration/Task";
import { ObsidianFileSystem } from "./obsidian/ObsidianFileSystem";
import { TaskBuilder } from "src/core/TaskBuilder";
import { File } from "src/core/Files/File";

export class ObsidianYatodoApp{
    obsidianApp:App;
    
    constructor(app:App){
        this.obsidianApp = app;
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
        /*
        const fs = new ObsidianFileSystem(this.obsidianApp);
        fs.setRootPath(rootPath);
        console.log(fs);

        const view = new ObsidianCreateButtonView(fs,this.getConfiguration(fs),this.obsidianApp);
        view.build(el);
        */
    }



    displayTaskList(source:string,el:HTMLElement):void{
        const parser:YAMLParser = new YAMLParser(source);
        const rootPath:string = parser.getRootPath();
        const fileSystem = new ObsidianFileSystem(this.obsidianApp);
        const files:File[] = fileSystem.getMarkdownFiles(rootPath);
        
        // parse
        const dummyFile = new Task("dummy",fileSystem);
        parser.setFilePropertiesToParse(dummyFile.properties);
        const filters = parser.parse();

        const taskBuilder = new TaskBuilder(files);
        taskBuilder.bulkFilterBy(filters);

        const view = new ObsidianTaskListView(taskBuilder.get(),this.obsidianApp);
        view.build(el);
    }
}