import { Todo } from "./Todo";


export class View{
    todos: Todo[];
    rootElement:HTMLElement;

    constructor(tl: Todo[],el:HTMLElement){
        this.todos = tl;
        this.rootElement = el;
    }

    toHTML(): HTMLElement{
        let table:HTMLTableElement = this.createTable(this.rootElement);
        let heading:HTMLHeadingElement = this.createHeading(table);

        this.createRows(table);

        return this.rootElement;
    }

    private createRows(table:HTMLTableElement){
        for(let i=0;i<this.todos.length;i++){
            let row:HTMLTableRowElement = table.createEl("tr");
            row.createEl("td", {text: this.todos[i].title});
            row.createEl("td", {text: this.todos[i].project})
            row.createEl("td", {text: this.todos[i].context as string})
            row.createEl("td", {text: this.todos[i].status as string})
        }
    }

    private createTable(el:HTMLElement):HTMLTableElement{
        return el.createEl("table",{cls:"yatodo"});
    }
    
    private createHeading(el:HTMLTableElement):HTMLHeadingElement{
        let head:HTMLHeadingElement = el.createEl("thead");
        head.createEl("th",{text:"Todo"});
        head.createEl("th",{text:"Project"});
        head.createEl("th",{text:"Context"});
        head.createEl("th",{text:"Status"});
        return head;
    }

   
}