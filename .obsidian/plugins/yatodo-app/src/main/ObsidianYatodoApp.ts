import { App, TFile } from "obsidian";
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

    getValidStarredValues():ValidStarredValues{
        const validStarredValues = new ValidStarredValues();
        validStarredValues.addValue("unstarred","✰")
        validStarredValues.addValue("starred","⭐")
        return validStarredValues;
    }

    getValidStatusValues():ValidStatusValues{
        const validStatusValues = new ValidStatusValues();
        validStatusValues.addValue("inbox","Inbox");
        validStatusValues.addValue("next","Next");
        validStatusValues.addValue("waiting_for","Waiting For");
        validStatusValues.addValue("deferred","Deferred");
        validStatusValues.addValue("done","Done");

        return validStatusValues;
    }

    getValidContextValues():ValidContextValues{
        let validContextValues = new ValidContextValues();
        validContextValues.addValue("desk","Desk");
        validContextValues.addValue("phone","Phone");
        validContextValues.addValue("read","Read");
        validContextValues.addValue("deep_thinking","Deep Thinking");
        validContextValues.addValue("desk","Desk");
        validContextValues.addValue("none","None");

        return validContextValues;
    }

    getValidProjectValues(fs:FileSystem):ValidProjectValues{
        let validProjectValues = new ValidProjectValues();
        
        const projects = fs.getFolders();
 
        projects.forEach((p) => {
            validProjectValues.addValue(p,p);
        });
        return validProjectValues;
    }

    getConfiguration(fs:FileSystem):TaskConfiguration{
        const validContextValues = this.getValidContextValues();
        const validStatusValues = this.getValidStatusValues();
        const validStarredValues = this.getValidStarredValues();
        const validProjectValues = this.getValidProjectValues(fs);
        const config = new TaskConfiguration(
            validProjectValues,
            validStatusValues,
            validContextValues,
            validStarredValues
        );
        return config;
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
        const fs = new ObsidianFileSystem(this.obsidianApp);
        const view = new ObsidianCreateButtonView(this.getConfiguration(fs),this.obsidianApp);
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