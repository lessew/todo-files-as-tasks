import { App } from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { ObsidianTaskListView } from "./ui/ObsidianTaskListView";
import { ObsidianCreateButtonView } from "./ui/ObsidianCreateButtonView";

export class ObsidianYatodoApp{
  
    
    static executeCommand(source:string,el:HTMLElement):void{
        if(source.indexOf("create-todo-button")>-1){
            ObsidianYatodoApp.displayCreateTaskButton(source,el);
        }
        else{
            ObsidianYatodoApp.displayTaskList(source,el);
        }
    }

    static displayCreateTaskButton(source:string,el:HTMLElement):void{

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



    static displayTaskList(source:string,el:HTMLElement):void{
        const parser:YAMLParser = new YAMLParser();
        parser.loadSource(source);
        const rootPath = parser.parseRootPath();
        /*
        const fs = new ObsidianFileSystem(this.obsidianApp);
        fs.setRootPath(rootPath);
        const files:File[] = fs.getMarkdownFiles();

        const config = this.getConfiguration(fs);

        parser.loadConfiguration(config);
        const query = parser.parse();

        let taskList:TaskList = new TaskList(files,query,config)
        */
        //const view = new ObsidianTaskListView(taskList,this.obsidianApp);

        //view.build(el); 
    }
}