import { App } from "obsidian";
import * as ObsidianImpl from "./main-module"
import * as UI from "./ui/ui-module";
import * as Core from "../core/core-module";

export class Main{
    static run(source:string,el:HTMLElement,app:App){
        ObsidianImpl.ObsidianWrapper.init(app); //singleton

        const parser:Core.YAMLParser = new Core.YAMLParser(source);
        const rootPath:string = parser.parseRootPath();

        const action = parser.parseAction();
        if(action==Core.YAMLParser.ACTION_LIST){
            const properties = ObsidianImpl.TaskFactory.getProperties();
            const filters = parser.parseFilters(properties);
            const files = ObsidianImpl.ObsidianWrapper.getInstance().getMarkdownFiles(rootPath);
            const taskBuilder = new Core.TaskBuilder(files);
            const filteredFiles = taskBuilder.bulkFilterBy(filters).get();
            const view = new UI.ObsidianTaskListView(filteredFiles);
            view.build(el);
        }
    }
}