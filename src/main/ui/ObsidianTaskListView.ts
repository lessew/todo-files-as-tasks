import { App } from "obsidian";
import { ProjectPropertyView } from "./ProjectPropertyView";
import { TitlePropertyView } from "./TitlePropertyView";
import { ContextPropertyView } from "./ContextPropertyView";
import { StatusPropertyView } from "./StatusPropertyView";
import { StarredPropertyView } from "./StarredPropertyView";
import { File } from "src/core/File";
import { BasenameProperty } from "src/core/Properties/BasenameProperty";
import { BasenamePropertyView } from "./BasenamePropertyView";
import { WhitelistPropertyView } from "./WhitelistPropertyView";
import { WhitelistProperty } from "src/core/Properties/WhitelistProperty";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";
import { ToplevelFolderPropertyView } from "./ToplevelFolderPropertyView";



export class ObsidianTaskListView {
    taskList:File[];
    obsidianApp:App;

    constructor(tl:File[],app:App){
        this.obsidianApp = app;
        this.taskList = tl;
    }

    build(rootElement:HTMLElement):HTMLElement{
        this.createTable(rootElement);
        return rootElement;
    }

    
    private createTable(parentElementToAttachTableTo:HTMLElement):void{
        let table:HTMLTableElement = parentElementToAttachTableTo.createEl("table",{cls:"yatodo"});
        this.createHeading(table);
        this.createRows(table);
    }

    private createHeading(tableElementToAttachHeadingTo:HTMLTableElement):void{
        let head:HTMLHeadingElement = tableElementToAttachHeadingTo.createEl("thead");
        head.createEl("th",{text:"Todo"});
        head.createEl("th",{text:"Project"});
        head.createEl("th",{text:"Context"});
        head.createEl("th",{text:"Status"});
        head.createEl("th",{text:"Starred"});

    }

    private createRows(tableElementToAttachRowTo:HTMLTableElement){
        for(let i=0;i<this.taskList.length;i++){
            const thisTask:File = this.taskList[i];
            let row:HTMLTableRowElement = tableElementToAttachRowTo.createEl("tr");
            let tdTitle:HTMLTableCellElement = row.createEl("td", {});
            this.createTitleHTML(thisTask,tdTitle);

            let tdProject:HTMLTableCellElement = row.createEl("td", {});
            this.createProjectHTML(thisTask,tdProject)
/*
            let tdContext:HTMLTableCellElement = row.createEl("td", {})
            this.createContextHTML(thisTask,tdContext);

            let tdStatus:HTMLTableCellElement = row.createEl("td", {})
            this.createStatusHTML(thisTask,tdStatus);

            let tdStarred:HTMLTableCellElement = row.createEl("td", {})
            this.createStarredHTML(thisTask,tdStarred);
            */
        }
    }
 
    private createTitleHTML(task:File,el:HTMLElement):void{
        const tp = new BasenamePropertyView(task.properties["title"] as BasenameProperty,this.obsidianApp);
        tp.build(el);
    }
   
    private createProjectHTML(task:File,el:HTMLElement):void{
        const pp = new ToplevelFolderPropertyView(task.properties["project"] as ToplevelFolderProperty,this.obsidianApp);
        pp.build(el);
    }
/*
    private createContextHTML(todo:Task,el:HTMLElement):void{
        const cc = new ContextPropertyView(todo,this.app);
        cc.build(el);
    }

    private createStatusHTML(todo:Task,el:HTMLElement):void{
        const ss = new StatusPropertyView(todo,this.app);
        ss.build(el);
    }

    private createStarredHTML(todo:Task,el:HTMLElement):void{
        const ss = new StarredPropertyView(todo,this.app);
        ss.build(el);
    }
*/
}
