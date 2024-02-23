import { App, MarkdownView, Modal, Notice, SuggestModal } from "obsidian";
import { Todo } from "src/core/Todo";
import { Folder } from "src/core/Folder";
import { Context, ValidContextValues,ValidStatusValues } from "src/core/FilePropertyValues";

export class ContextPropertyView{
    todo:Todo;
    obsidianApp:App;

    constructor(todo:Todo, app:App){
        this.todo = todo;
        this.obsidianApp = app;
    }

    build(rootElement:HTMLElement):void{
        const contextHumanReadable = this.todo.validContextValues.getValue(this.todo.context);
        let a:HTMLElement = rootElement.createEl("a",{text:contextHumanReadable as string});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SelectContextModal =  new SelectContextModal(this.todo,this.obsidianApp);
        m.open();
    }
}

export class SelectContextModal extends SuggestModal<Context>{

    todo:Todo;
    validContextValues:string[];

    constructor(todo:Todo, app: App) {
        super(app);
        this.todo = todo;
        this.validContextValues = this.todo.validContextValues.getAllHumanReadableValues();
    }
        
    getSuggestions(query: string): Context[] | Promise<Context[]> {
        return this.validContextValues;
    }

    renderSuggestion(value: Context, el: HTMLElement) {
        el.createEl("div", { text: value });
    }

    onChooseSuggestion(item: Context, evt: MouseEvent | KeyboardEvent) {
        const id = this.todo.validContextValues.getIdFromHumanReadableValue(item);
        this.todo.context = id;
        setTimeout(
            () => this.app.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
        ,100)        
    }
}
