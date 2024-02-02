import { TodoList } from "./TodoList";


export class View{
    todoList: TodoList;
    el:HTMLElement;

    private constructor(tl: TodoList,el:HTMLElement){
        this.todoList = tl;
        this.el = el;
    }

    static toHTML(tl:TodoList,el:HTMLElement): HTMLElement{
        //let v = new View(tl,el);

        //const newEl = v.addTable().addTableRow().addTableColumn("Een tekstje")

        let table:HTMLTableElement = this.createTable(el);
        let heading:HTMLHeadingElement = this.createHeading(table);
        let row1:HTMLTableRowElement = this.createRow(table);
        /*
        let head:HTMLHeadingElement = table.createEl("thead");
        let th1:HTMLHeadElement = head.createEl("th").innerText = "Head 1"
        let th2:HTMLHeadElement = head.createEl("th").innerText = "Head 2"
        let th3:HTMLHeadElement = head.createEl("th").innerText = "Head 3"
        let th4:HTMLHeadElement = head.createEl("th").innerText = "Head 4"

        let tr1:HTMLTableRowElement = table.createEl("tr");
        let td1:HTMLTableCellElement = tr1.createEl("td").innerText = "shzzle"
        let td2:HTMLTableCellElement = tr1.createEl("td").innerText = "shzzle"
        let td3:HTMLTableCellElement = tr1.createEl("td").innerText = "shzzle"
        let td4:HTMLTableCellElement = tr1.createEl("td").innerText = "shzzle"
        */

        return el;
    }


    private static createTable(el:HTMLElement):HTMLTableElement{
        return el.createEl("table");
    }
    
    private static createHeading(el:HTMLTableElement):HTMLHeadingElement{
        let head:HTMLHeadingElement = el.createEl("thead");
        head.createEl("th").innerText = "Head 1";
        head.createEl("th").innerText = "Head 2";
        head.createEl("th").innerText = "Head 3";
        head.createEl("th").innerText = "Head 4";
        return head;
    }

    private static createRow(el:HTMLTableElement){
        let row:HTMLTableRowElement = el.createEl("tr");
        row.createEl("td").innerText = " cell 1";
        row.createEl("td").innerText = " cell 2";
        row.createEl("td").innerText = " cell 3";
        row.createEl("td").innerText = " cell 4";
        return row;
    }
}