import { Parser } from "src/core/Parser";
import { Query } from "src/core/Query";
import { YAMLParser} from "src/core/YAMLParser";
import { FileAndFolderCollection } from "src/core/FileAndFolderCollection";
import { TodoListBuilder } from "src/core/TodoListBuilder";
import { Todo } from "src/core/Todo";
import { Folder } from "src/core/Folder";
import { ObsidianView } from "./ui/ObsidianView";
import * as Yatodo from 'src/core/ui/View';

import { ObsidianFileAndFolderCollection } from "./ObsidianFileAndFolderCollection";
import { App } from "obsidian";


export class YatodoCodeBlockProcessor{

   static processYAML(source:string,el:HTMLElement,app:App){

        const parser:Parser = new YAMLParser();
        const query:Query = parser.parse(source);
        const fileAndFolderCollection: FileAndFolderCollection = 
                new ObsidianFileAndFolderCollection(query.rootPath,app);


        const builder:TodoListBuilder = new TodoListBuilder(fileAndFolderCollection);
        const folders:Folder[] = fileAndFolderCollection.folders;
        const todos:Todo[]= builder.build(query);

        const view:Yatodo.View = new ObsidianView(todos,folders,app);
        view.build(el); // Code smell: rootElement already attached, no need to fetch it's return 

    }
}