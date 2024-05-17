import { TaskListView } from "./ui/TaskListView";
import { CreateTaskButtonView } from "./ui/CreateTaskButtonView";
import { FATError } from "src/core/Error";
import { TestView } from "src/test/TestView";
import { ObsidianFolder } from "../core/FileSystem/obsidian/ObsidianFolder";
import FileAsTaskPlugin from "main";
import { FolderModel } from "src/core/FileSystem/FolderModel";
import { Configuration } from "src/core/Configuration/Configuration";
import { YAMLParser } from "src/core/Configuration/YAMLParser";
import { FileAsTaskCollection } from "src/core/FileSystem/FileAsTaskCollection";

// TODO debug special cases (/ " etc in title on update)
export class CodeBlock{
    source:string;
    el:HTMLElement;
    plugin:FileAsTaskPlugin;
    root:string;
    rootFolder:FolderModel;
    config: Configuration;

    constructor(source:string,el:HTMLElement,plugin:FileAsTaskPlugin){
        this.source = source;
        this.el = el;
        this.plugin = plugin;
    }

    async reload():Promise<void>{
        this.el.innerHTML = "";
        await this.load();
    }
    
    async load():Promise<void>{
        this.config = new Configuration();
        this.config.loadSource(this.source);
        this.config.loadSettings(this.plugin.pluginSettings);
        this.config.loadRootPath();
        this.config.loadAction();
        if(this.config.stateIsError()){
            this.displayUserError(this.config.getErrorState());
            return;
        }

        this.rootFolder = await ObsidianFolder.create(this.config.getRootPath(),this.config.getRootPath(),this.plugin);
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
        let view = new TaskListView(fileAsTaskCollection,this.plugin);
        view.build(this.el);
    }

    displayCreateTaskButton():void{
        const view = new CreateTaskButtonView(this.root,this.plugin);
        view.build(this.el);
    }

    displayTest():void{
        const testView = new TestView(this.plugin,this.el);
        testView.main();
    }
}