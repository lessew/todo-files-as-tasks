import { App, TFile } from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { TaskList } from "src/core/TaskList";
import { ObsidianView } from "./ui/ObsidianView";
import { File } from "src/core/File";
import { FileSystem } from "src/core/FileSystem";
import { ValidContextValues,ValidProjectValues,ValidStatusValues } from "src/core/FilePropertyValues";
import { ObsidianFileSystem } from "./ObsidianFileSystem";
import { TaskConfiguration } from "src/core/TaskConfiguration";

export class ObsidianYatodoApp{
    parser:YAMLParser;
    obsidianApp:App; 
    
    constructor(obsidianApp:App){
        this.obsidianApp = obsidianApp;
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

    executeCommand(source:string,el:HTMLElement):void{
        const validContextValues = this.getValidContextValues();
        const validStatusValues = this.getValidStatusValues();

        let parser = new YAMLParser(validContextValues,validStatusValues);
        const query = parser.parse(source);

        const fs = new ObsidianFileSystem(this.obsidianApp);
        fs.setRootPath(query.rootPath);
        const files:File[] = fs.getMarkdownFiles();

        const validProjectValues = this.getValidProjectValues(fs);
        const config = new TaskConfiguration(validProjectValues,validStatusValues,validContextValues);

        let taskList:TaskList = new TaskList(files,query,config)
        
        const view = new ObsidianView(taskList,this.obsidianApp);

        view.build(el); 
    }
}