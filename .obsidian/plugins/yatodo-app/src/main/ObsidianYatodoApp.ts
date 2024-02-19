import { App, CachedMetadata, TFile } from "obsidian";
import { FileAndFolderCollection } from "src/core/FileAndFolderCollection";
import { Parser } from "src/core/Parser";
import { Query } from "src/core/Query";
import { YAMLParser } from "src/core/YAMLParser";
import { ObsidianFileAndFolderCollection } from "./ObsidianFileAndFolderCollection";
import { TodoListBuilder } from "src/core/TodoListBuilder";
import { Folder } from "src/core/Folder";
import { Todo } from "src/core/Todo";
import * as Yatodo from 'src/core/ui/View';
import { ObsidianView } from "./ui/ObsidianView";
import { YaTodoApp } from "src/core/YaTodoApp";
import { ObsidianFile } from "./ObsidianFile";
import { File } from "src/core/File";

export class ObsidianYatodoApp extends YaTodoApp{
    parser:Parser;
    query:Query;
    obsidianApp:App;
    rootElement:HTMLElement;
    
    constructor(obsidianApp:App){
        super();
        this.obsidianApp = obsidianApp
        this.parser = new YAMLParser();
    }

    executeCommand(source:string,el:HTMLElement):void{
        this.query = this.parser.parse(source);
        this.rootElement = el;

        const fileAndFolderCollection: FileAndFolderCollection = 
        new ObsidianFileAndFolderCollection(this.query.rootPath,this.obsidianApp);

        const builder:TodoListBuilder = new TodoListBuilder(fileAndFolderCollection);
        const folders:Folder[] = fileAndFolderCollection.folders;
        const todos:Todo[]= builder.build(this.query);

        const view:Yatodo.View = new ObsidianView(todos,folders,this.obsidianApp);
        view.build(el); 
    }
}