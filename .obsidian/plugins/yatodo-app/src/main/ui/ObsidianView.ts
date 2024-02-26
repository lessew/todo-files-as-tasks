import { App } from "obsidian";
import { Task } from "../../core/Task";
import { ProjectPropertyView } from "./ProjectPropertyView";
import { TitlePropertyView } from "./TitlePropertyView";
import { ContextPropertyView } from "./ContextPropertyView";
import { StatusPropertyView } from "./StatusPropertyView";
import { StarredPropertyView } from "./StarredPropertyView";
import { TaskList } from "src/core/TaskList";


export class ObsidianView {
    taskList:TaskList
    app:App;

    constructor(tl:TaskList,app:App){
        this.taskList = tl;
        this.app = app;
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
        for(let i=0;i<this.taskList.tasks.length;i++){
            const thisTask = this.taskList.tasks[i];
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
 
    private createTitleHTML(todo:Task,el:HTMLElement):void{
        const tp = new TitlePropertyView(todo,this.app);
        tp.build(el);
    }
   
    private createProjectHTML(todo:Task,el:HTMLElement):void{
        const pp = new ProjectPropertyView(todo,this.app);
        pp.build(el);
    }

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

}
