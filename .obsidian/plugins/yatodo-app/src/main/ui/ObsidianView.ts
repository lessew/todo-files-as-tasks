import { App } from "obsidian";
import { Todo } from "../../core/Todo";
import { Folder } from "../../core/Folder"
import { View } from "../../core/ui/View"
import { ProjectPropertyView } from "./ProjectPropertyView";
import { TitlePropertyView } from "./TitlePropertyView";
import { ContextPropertyView } from "./ContextPropertyView";


export class ObsidianView implements View{
    todos: Todo[];
    folders: Folder[];
    app:App;

    constructor(tl:Todo[],folders:Folder[], app:App){
        this.todos = tl;
        this.folders = folders;
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
    }

    private createRows(tableElementToAttachRowTo:HTMLTableElement){
        for(let i=0;i<this.todos.length;i++){
            let row:HTMLTableRowElement = tableElementToAttachRowTo.createEl("tr");
            let tdTitle:HTMLTableCellElement = row.createEl("td", {});
            this.createTitleHTML(this.todos[i],tdTitle);

            let tdProject:HTMLTableCellElement = row.createEl("td", {});
            this.createProjectHTML(this.todos[i],tdProject)

            let tdContext:HTMLTableCellElement = row.createEl("td", {})
            this.createContextHTML(this.todos[i],tdContext);

            let tdStatus:HTMLTableCellElement = row.createEl("td", {})
            this.createStatusHTML(this.todos[i],tdStatus);

        }
    }
 
    private createTitleHTML(todo:Todo,el:HTMLElement):void{
        const tp = new TitlePropertyView(todo,this.app);
        tp.build(el);
    }
   
    private createProjectHTML(todo:Todo,el:HTMLElement):void{
        const pp = new ProjectPropertyView(todo,this.folders,this.app);
        pp.build(el);
    }

    private createContextHTML(todo:Todo,el:HTMLElement):void{
        const cc = new ContextPropertyView(todo,this.app);
        cc.build(el);
    }

    private createStatusHTML(todo:Todo,el:HTMLElement):void{
        el.createEl("a",{text:todo.status as string});
    }

}
