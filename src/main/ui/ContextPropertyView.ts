import { App, MarkdownView, SuggestModal } from "obsidian";
import { Task } from "src/core/Task";

export class ContextPropertyView{
    task:Task;
    obsidianApp:App;

    constructor(task:Task, app:App){
        this.task = task;
        this.obsidianApp = app;
    }

    build(rootElement:HTMLElement):void{
        const contextHumanReadable = this.task.config.validContextValues.getValue(this.task.context);
        let a:HTMLElement = rootElement.createEl("a",{text:contextHumanReadable as string});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SelectContextModal =  new SelectContextModal(this.task,this.obsidianApp);
        m.open();
    }
}

export class SelectContextModal extends SuggestModal<string>{

    task:Task;
    validContextValues:string[];

    constructor(task:Task, app: App) {
        super(app);
        this.task = task;
        this.validContextValues = this.task.config.validContextValues.getAllHumanReadableValues();
    }
        
    getSuggestions(query: string): string[] | Promise<string[]> {
        return this.validContextValues;
    }

    renderSuggestion(value: string, el: HTMLElement) {
        el.createEl("div", { text: value });
    }

    onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent) {
        const id = this.task.config.validContextValues.getIdFromHumanReadableValue(item);
        this.task.context = id;
        setTimeout(
            () => this.app.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
        ,100)        
    }
}
