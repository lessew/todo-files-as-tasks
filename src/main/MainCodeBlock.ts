import { App } from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { TaskListView } from "./ui/TaskListView";
import { CreateTaskButtonView } from "./ui/CreateTaskButtonView";
import { Settings } from "../core/Settings";
import { FATError } from "src/core/Error";
import { TestView } from "src/test/TestView";
import { ObsidianFolder } from "./obsidian/ObsidianFolder";
import { FolderModel } from "src/core/Interfaces/FolderModel";
import { FileAsTaskCollection } from "src/core/FileAsTaskCollection";
import { Whitelist } from "src/core/Whitelist";

// TODO debug special cases (/ " etc in title on update)
export class MainCodeBlock{
    source:string;
    el:HTMLElement;
    settings:Settings;
    app:App;
    root:string;

    constructor(source:string,el:HTMLElement,settings:Settings,app:App){
        this.source = source;
        this.el = el;
        this.settings = settings;
        this.app = app;
    }

    reload():void{
        this.el.innerHTML = "";
        this.load();
    }

    async load():Promise<void>{
        const parser:YAMLParser = new YAMLParser();
        
        const yamlParseResult = parser.loadSource(this.source);
        
        if(FATError.isError(yamlParseResult)){
            this.displayUserError(yamlParseResult);
            return;
        }

        const rootPath = parser.parseRootPath();
        if(FATError.isError(rootPath)){
            this.displayUserError(rootPath);
            return;
        }
        this.root = rootPath;

        const rootFolder = await ObsidianFolder.create(rootPath,rootPath);
        this.settings.get("project").whitelist = new Whitelist(rootFolder.getFolderPaths());
        this.settings.get("project").defaultValue = rootFolder.getFolderPaths()[0];
        
        const action = parser.parseAction();
        if(FATError.isError(action)){
            this.displayUserError(action);
            return;
        }

        if(action==YAMLParser.ACTION_LIST){
           await this.displayActionList(parser,rootFolder)
        }
        else if(action==YAMLParser.ACTION_CREATE_BUTTON){
           this.displayCreateTaskButton();
        }
        else if(action==YAMLParser.ACTION_TEST){
            this.displayTest(this.el);
        }
    }

    displayUserError(error:FATError){
        const msg = error.message;// + "\n" + this.source;
        this.el.createEl("div",{text:msg});
    }

    displayActionList(parser:YAMLParser,rootFolder:FolderModel):void{
        const filters = parser.parseFilters(this.settings);
        if(FATError.isError(filters)){
            this.displayUserError(filters);
            return;
        }
        const fileAsTaskCollection = new FileAsTaskCollection(rootFolder,this.settings);
        fileAsTaskCollection.bulkFilterBy(filters);
        //fileAsTaskCollection.groupBy('project');
        //fileAsTaskCollection.sortBy('context','ASC');
        let view = new TaskListView(fileAsTaskCollection,this.settings,this.app);
        view.build(this.el);
    }

    displayCreateTaskButton():void{
        const view = new CreateTaskButtonView(this.root,this.app,this.settings);
        view.build(this.el);
    }

    displayTest(el:HTMLElement):void{
        const testView = new TestView(this.app,el);
        testView.main();
    }
}