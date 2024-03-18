import { App } from "obsidian";
import { File } from "src/core/File";
import { BasenameProperty } from "src/core/Properties/BasenameProperty";
import { BasenamePropertyView } from "./Propertyviews/BasenamePropertyView";
import { WhitelistPropertyView } from "./Propertyviews/WhitelistPropertyView";
import { WhitelistProperty } from "src/core/Properties/WhitelistProperty";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";
import { ToplevelFolderPropertyView } from "./Propertyviews/ToplevelFolderPropertyView";
import { BooleanProperty } from "src/core/Properties/BooleanProperty";
import { BooleanPropertyView } from "./Propertyviews/BooleanPropertyView";



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

            let tdContext:HTMLTableCellElement = row.createEl("td", {})
            this.createContextHTML(thisTask,tdContext);

            let tdStatus:HTMLTableCellElement = row.createEl("td", {})
            this.createStatusHTML(thisTask,tdStatus);

            let tdStarred:HTMLTableCellElement = row.createEl("td", {})
            this.createStarredHTML(thisTask,tdStarred);
        
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

    private createContextHTML(task:File,el:HTMLElement):void{
        const cc = new WhitelistPropertyView(task.properties["context"] as WhitelistProperty,this.obsidianApp);
        cc.build(el);
    }

    private createStatusHTML(task:File,el:HTMLElement):void{
        const ss = new WhitelistPropertyView(task.properties["status"] as WhitelistProperty,this.obsidianApp);
        ss.build(el);
    }

    private createStarredHTML(task:File,el:HTMLElement):void{
        const ss = new BooleanPropertyView(task.properties["starred"] as BooleanProperty,this.obsidianApp);
        ss.build(el);
    }

}
