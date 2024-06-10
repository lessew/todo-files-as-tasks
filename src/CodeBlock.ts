import FileAsTaskPlugin from "main";
import { Configuration } from "./Configuration/Configuration";
import { YAMLParser } from "./Configuration/YAMLParser";
import { Directory } from "./FileSystem/Directory";
import { CreateTaskButtonView } from "./MainUI/CreateTaskButtonView";
import { TaskListView } from "./MainUI/TaskListView";
import { TestView } from "./MainUI/TestView";
import { ObsidianIOFactory } from "./FileSystem/obsidian/ObsidianIOFactory";
import { ObsidianFilesystem } from "./FileSystem/obsidian/ObsidianFilesystem";
import { FileAsTaskCollection } from "./FileAsTask/FileAsTaskCollection";

export class CodeBlock{
    source:string;
    el:HTMLElement;
    plugin:FileAsTaskPlugin;
    root:string;
    rootDirectory:Directory;
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
        let ofs = new ObsidianFilesystem(this.plugin);
        let iof = new ObsidianIOFactory(this.plugin);

        this.rootDirectory = iof.createDirectory(this.config.getRootPath());
        this.config.loadDirectories(this.rootDirectory.getDirectories().map(dir => dir.fullPath));

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
    
    displayUserError(error:Error){
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
        const fileAsTaskCollection = new FileAsTaskCollection(this.rootDirectory,this.config.getYAMLStrategies());
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