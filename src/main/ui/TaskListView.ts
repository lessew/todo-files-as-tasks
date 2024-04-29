import { App } from "obsidian";
import { BasenamePropertyView } from "../../core/Properties/Basename/BasenamePropertyView";
import { WhitelistYAMLPropertyView } from "../../core/Properties/WhitelistYAML/WhitelistYAMLPropertyView";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolder/ToplevelFolderProperty";
import { ToplevelFolderPropertyView } from "../../core/Properties/ToplevelFolder/ToplevelFolderPropertyView";
import { BooleanYAMLPropertyView } from "../../core/Properties/BooleanYAML/BooleanYAMLPropertyView";
import { FileAsTaskCollection } from "src/core/FileAsTaskCollection";
import { FileAsTask } from "src/core/FileAsTask";
import { BasenameProperty } from "src/core/Properties/Basename/BasenameProperty";
import { WhitelistYAMLProperty } from "src/core/Properties/WhitelistYAML/WhitelistYAMLProperty";
import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAML/BooleanYAMLProperty";
import { LinkView } from "./LinkView";

export class TaskListView {
    taskList:FileAsTask[];
    obsidianApp:App;
    fileAsTaskCollection:FileAsTaskCollection;

    constructor(fatc:FileAsTaskCollection,app:App){
        this.obsidianApp = app;
        this.fileAsTaskCollection = fatc;
        this.taskList = fatc.get();
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
        head.createEl("th",{text:"Task"});
        head.createEl("th",{text:"Link"});
        head.createEl("th",{text:"Project"});
        head.createEl("th",{text:"Context"});
        head.createEl("th",{text:"Status"});
        head.createEl("th",{text:"Starred"});

    }

    private createRows(tableElementToAttachRowTo:HTMLTableElement){
        for(let i=0;i<this.taskList.length;i++){
            const thisTask:FileAsTask = this.taskList[i];
            let row:HTMLTableRowElement = tableElementToAttachRowTo.createEl("tr");
            let tdTitleLink:HTMLTableCellElement = row.createEl("td", {});
            this.createEditTitleHTML(thisTask,tdTitleLink);

            let tdTitleEdit:HTMLTableCellElement = row.createEl("td", {});
            this.createLinkHTML(thisTask,tdTitleEdit);

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

    private createEditTitleHTML(task:FileAsTask,el:HTMLElement):void{
        let prop = task.getProperty("title") as BasenameProperty;
        const tp = new BasenamePropertyView(prop,this.obsidianApp);
        tp.build(el);
    }

    private createLinkHTML(task:FileAsTask,el:HTMLElement):void{
        let prop = task.getProperty("title") as BasenameProperty;
        const lv = new LinkView();
        lv.build(el,"link",prop.file.path);
    }
   
    private createProjectHTML(task:FileAsTask,el:HTMLElement):void{
        const pp = new ToplevelFolderPropertyView(task.getProperty("project") as ToplevelFolderProperty,this.obsidianApp);
        pp.build(el);
    }

    private createContextHTML(task:FileAsTask,el:HTMLElement):void{
        const cc = new WhitelistYAMLPropertyView(
            task.getProperty("context") as WhitelistYAMLProperty,
            this.obsidianApp);
        cc.build(el);
    }

    private createStatusHTML(task:FileAsTask,el:HTMLElement):void{
        // TODO handle error in case 'status' is not found
        const ss = new WhitelistYAMLPropertyView(task.getProperty("status") as WhitelistYAMLProperty,this.obsidianApp);
        ss.build(el);
    }

    private createStarredHTML(task:FileAsTask,el:HTMLElement):void{
        const ss = new BooleanYAMLPropertyView(task.getProperty("starred") as BooleanYAMLProperty);
        ss.build(el);
    }

}
