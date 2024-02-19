import { App } from "obsidian";
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

export class ObsidianYatodoApp {
    parser:Parser;
    query:Query;
    app:App;
    rootElement:HTMLElement;
    
    constructor(app:App){
        this.app = app;
        this.parser = new YAMLParser();
    }

    executeCommand(source:string,el:HTMLElement):void{
       this.query = this.parser.parse(source);
        this.rootElement = el;

        const fileAndFolderCollection: FileAndFolderCollection = 
        new ObsidianFileAndFolderCollection(this.query.rootPath,app);

        const builder:TodoListBuilder = new TodoListBuilder(fileAndFolderCollection);
        const folders:Folder[] = fileAndFolderCollection.folders;
        const todos:Todo[]= builder.build(this.query);

        const view:Yatodo.View = new ObsidianView(todos,folders,app);
        view.build(el); // Code smell: rootElement already attached, no need to fetch it's return 
    }


}