import { App, View } from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { ObsidianWrapper } from "./obsidian/ObsidianWrapper";
import { TaskListView } from "./ui/TaskListView";
import { FolderList } from "../core/FolderList";
import { CreateTaskButtonView } from "./ui/CreateTaskButtonView";
import { FileFilter } from "src/core/FileFilter";
import { Settings } from "../core/FileAsTaskSettings";
import { FATError,YAMLParseError,RootPathError,NoFilesFoundError } from "src/core/Error";
import { TestView } from "src/test/TestView";
import { ObsidianFolder } from "./obsidian/ObsidianFolder";
import { FolderModel } from "src/core/Interfaces/FolderModel";
import { FileList } from "src/core/FileList";

export class MainCodeBlock{
    source:string;
    el:HTMLElement;
    settings:Settings;
    app:App;

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

    load():void{
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

        ObsidianWrapper.getInstance().addMainCodeBlock(this);

        const rootFolder = new ObsidianFolder(rootPath);
        const folderList = FolderList.getFoldersAsWhitelist(rootFolder);
        
        this.settings.project.whitelist = folderList;

        const action = parser.parseAction();
        if(FATError.isError(action)){
            this.displayUserError(action);
            return;
        }

        if(action==YAMLParser.ACTION_LIST){
           this.displayActionList(parser,rootFolder)
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
       
        const tasks = FileList.getFilesAsTasks(rootFolder,this.settings);

        const filters = parser.parseFilters(this.settings);
        if(FATError.isError(filters)){
            this.displayUserError(filters);
            return;
        }

        const fileFilter = new FileFilter(tasks);
        const filteredFiles = fileFilter.bulkFilterBy(filters).get();
        const view = new TaskListView(filteredFiles,this.app);
        view.build(this.el);
    }

    displayCreateTaskButton():void{
        const view = new CreateTaskButtonView(this.app,this.settings);
        view.build(this.el);
    }

    displayTest(el:HTMLElement):void{
        const testView = new TestView(this.app,el);
        testView.main();
        //testView.build(this.el);
    }
}