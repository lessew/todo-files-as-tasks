import { App, TFile } from "obsidian";
import { FileAndFolderCollection } from "src/core/FileAndFolderCollection";
import { Parser } from "src/core/Parser";
import { Query } from "src/core/Query";
import { YAMLParser } from "src/core/YAMLParser";
import { TodoListBuilder } from "src/core/TodoListBuilder";
import { Folder } from "src/core/Folder";
import { Todo } from "src/core/Todo";
import * as Yatodo from 'src/core/ui/View';
import { ObsidianView } from "./ui/ObsidianView";
import { YaTodoApp } from "src/core/YaTodoApp";
import { ObsidianFile } from "./ObsidianFile";
import { File } from "src/core/File";
import { ValidContextValues,ValidStatusValues } from "src/core/FilePropertyValues";

export class ObsidianYatodoApp extends YaTodoApp{
    parser:Parser;
    query:Query;
    obsidianApp:App;
    rootElement:HTMLElement;
    validContextValues:ValidContextValues;
    validStatusValues:ValidStatusValues;
    
    constructor(obsidianApp:App){
        super();
        this.obsidianApp = obsidianApp;
        this.setValidStatusValues();
        this.setValidContextValues();
        this.parser = new YAMLParser(this.validContextValues,this.validStatusValues);
    }

    setValidStatusValues():void{
        this.validStatusValues = new ValidStatusValues();
        this.validStatusValues.addValue("inbox","Inbox");
        this.validStatusValues.addValue("next","Next");
        this.validStatusValues.addValue("waiting_for","Waiting For");
        this.validStatusValues.addValue("deferred","Deferred");
    }

    setValidContextValues():void{
        this.validContextValues = new ValidContextValues();
        this.validContextValues.addValue("desk","Desk");
        this.validContextValues.addValue("phone","Phone");
        this.validContextValues.addValue("read","Read");
        this.validContextValues.addValue("deep_thinking","Deep Thinking");
        this.validContextValues.addValue("desk","Desk");
    }

    executeCommand(source:string,el:HTMLElement):void{
        this.query = this.parser.parse(source);
        this.rootElement = el;

        const fileAndFolderCollection:FileAndFolderCollection = new FileAndFolderCollection(this);
        fileAndFolderCollection.build(this.query.rootPath);

        const builder:TodoListBuilder = new TodoListBuilder(
            fileAndFolderCollection,
            this.validStatusValues,
            this.validContextValues);

        const folders:Folder[] = fileAndFolderCollection.folders;
        const todos:Todo[]= builder.build(this.query);

        const view:Yatodo.View = new ObsidianView(todos,folders,this.obsidianApp);
        view.build(el); 
    }

    getAllMarkdowndownFiles():File[]{
        const tf:TFile[] = this.obsidianApp.vault.getMarkdownFiles();
        let files:File[] = [];
        tf.forEach(aFile => {
            const newFile:File = new ObsidianFile(aFile,this.obsidianApp);
            files.push(newFile)
        })
        return files;
    }
}