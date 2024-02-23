import { App, MarkdownView, Modal, Notice, SuggestModal } from "obsidian";
import { Todo } from "src/core/Todo";
import { Folder } from "src/core/Folder";
import { Status,  } from "src/core/FileProperties";

export class StatusPropertyView{
    todo:Todo;
    obsidianApp:App;

    constructor(todo:Todo, app:App){
        this.todo = todo;
        this.obsidianApp = app;
    }

    build(rootElement:HTMLElement):void{
        const StatusHumanRedeadable = this.todo.validStatusValues.getValue(this.todo.status);
        let a:HTMLElement = rootElement.createEl("a",{text:StatusHumanRedeadable as string});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SelectStatusModal =  new SelectStatusModal(this.todo,this.obsidianApp);
        m.open();
    }
}

export class SelectStatusModal extends SuggestModal<Status>{

    todo:Todo;
    validStatusValues:string[];

    constructor(todo:Todo, app: App) {
        super(app);
        this.todo = todo;
        this.validStatusValues = this.todo.validStatusValues.getAllHumanReadableValues();
    }
        
    getSuggestions(query: string): Status[] | Promise<Status[]> {
        return this.validStatusValues;
    }

    renderSuggestion(value: Status, el: HTMLElement) {
        el.createEl("div", { text: value });
    }

    onChooseSuggestion(item: Status, evt: MouseEvent | KeyboardEvent) {
        const id = this.todo.validStatusValues.getIdFromHumanReadableValue(item);
        this.todo.status = id;
        setTimeout(
            () => this.app.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
        ,100)    
    }
}
