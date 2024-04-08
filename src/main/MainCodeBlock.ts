import { App } from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { ObsidianWrapper } from "./obsidian/ObsidianWrapper";
import { TaskListView } from "./ui/TaskListView";
import { FileList } from "./obsidian/FileList";
import { FolderList } from "./obsidian/FolderList";
import { CreateTaskButtonView } from "./ui/CreateTaskButtonView";
import { FileFilter } from "src/core/FileFilter";
import { FATSettings } from "./FileAsTaskSettings";
import { FATError,YAMLParseError,RootPathError,NoFilesFoundError } from "src/core/Error";

export class MainCodeBlock{
    source:string;
    el:HTMLElement;
    settings:FATSettings;
    app:App;

    constructor(source:string,el:HTMLElement,settings:FATSettings,app:App){
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
        
        const yamlParseResult:(UserError | true) = parser.loadSource(this.source);
        if(Error.isUserError(yamlParseResult)){
            this.displayUserError(yamlParseResult);
            return;
        }

        const rootPathParseResult:(UserError | true) = parser.validate();
        if(Error.isUserError(rootPathParseResult)){
            this.displayUserError(rootPathParseResult);
            return;
        }

        const rootPath:string = parser.parseRootPath();

        ObsidianWrapper.getInstance().addMainCodeBlock(this);

        // load files and folders from obsidian / filesystem
        const folderList = new FolderList();
        folderList.init(rootPath);
        this.settings.project.allowedValues = folderList.folders;

        const action = parser.parseAction();
        if(action==YAMLParser.ACTION_LIST){
           this.displayActionList(parser,rootPath)
        }
        else if(action==YAMLParser.ACTION_CREATE_BUTTON){
           this.displayCreateTaskButton();
        }
    }

    displayUserError(error:UserError){
        const msg = error.message;// + "\n" + this.source;
        this.el.createEl("div",{text:msg,cls:"color:red"});
    }

    displayActionList(parser:YAMLParser,rootPath:string):void{
        const fileList = new FileList();
        fileList.init(rootPath,this.settings);
        const filters = parser.parseFilters(this.settings);
        const fileFilter = new FileFilter(fileList.files);
        const filteredFiles = fileFilter.bulkFilterBy(filters).get();
        const view = new TaskListView(filteredFiles,this.app);
        view.build(this.el);
    }

    displayCreateTaskButton():void{
        const view = new CreateTaskButtonView(this.app,this.settings);
        view.build(this.el);
    }
}