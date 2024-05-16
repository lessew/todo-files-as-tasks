import { App} from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { TaskListView } from "./ui/TaskListView";
import { CreateTaskButtonView } from "./ui/CreateTaskButtonView";
import { FATError } from "src/core/Error";
import { TestView } from "src/test/TestView";
import { ObsidianFolder } from "./obsidian/ObsidianFolder";
import { FolderModel } from "src/core/Interfaces/FolderModel";
import { FileAsTaskCollection } from "src/core/FileAsTaskCollection";
import { Whitelist } from "src/core/Whitelist";
import { Configuration } from "src/core/Configuration";

// TODO debug special cases (/ " etc in title on update)
export class MainCodeBlock{
    source:string;
    el:HTMLElement;
    jsonSettings:any;
    app:App;
    root:string;
    rootFolder:FolderModel;
    config: Configuration;

    constructor(source:string,el:HTMLElement,jsonSettings:any,app:App){
        this.source = source;
        this.el = el;
        this.jsonSettings = jsonSettings;
        this.app = app;
    }

    reload():void{
        this.el.innerHTML = "";
        this.load();
    }
    
    async load():Promise<void>{
        this.config = new Configuration();
        this.config.loadSource(this.source);
        this.config.loadSettings(this.jsonSettings);
        this.config.loadRootPath();
        this.config.loadAction();
        if(this.config.stateIsError()){
            this.displayUserError(this.config.getErrorState());
            return;
        }


        

        this.rootFolder = await ObsidianFolder.create(this.config.getRootPath(),this.config.getRootPath());
        this.config.loadFolders(this.rootFolder.getFolderPaths());

        if(this.config.getAction()==YAMLParser.ACTION_LIST){
            this.displayActionList();
        }
        else if(this.config.getAction()==YAMLParser.ACTION_TEST){
            this.displayTest();
        }
        else if(this.config.getAction()==YAMLParser.ACTION_CREATE_BUTTON){
            this.displayCreateTaskButton();
        }

    }

    

    displayUserError(error:FATError){
        const msg = error.message;// + "\n" + this.source;
        this.el.createEl("div",{text:msg});
    }

    displayActionList():void{
        this.config.loadFilters();
        if(this.config.stateIsError()){
            this.displayUserError(this.config.getErrorState());
            return;
        }

        const filters = this.config.getFilters();
        const fileAsTaskCollection = new FileAsTaskCollection(this.rootFolder,this.config.getSettings());
        fileAsTaskCollection.bulkFilterBy(filters);
        //fileAsTaskCollection.groupBy('project');
        //fileAsTaskCollection.sortBy('context','ASC');
        let view = new TaskListView(fileAsTaskCollection,this.config.getSettings(),this.app);
        view.build(this.el);
    }

    displayCreateTaskButton():void{
        const view = new CreateTaskButtonView(this.root,this.app,this.config.getSettings());
        view.build(this.el);
    }

    displayTest():void{
        const testView = new TestView(this.app,this.el);
        testView.main();
    }
}