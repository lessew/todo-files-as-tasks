import { App, MarkdownView, Modal, Notice, SuggestModal } from "obsidian";
import { Task } from "src/core/Task";

export class StatusPropertyView{
    task:Task;
    obsidianApp:App;

    constructor(task:Task, app:App){
        this.task = task;
        this.obsidianApp = app;
    }

    build(rootElement:HTMLElement):void{
        const StatusHumanRedeadable = this.task.config.validStatusValues.getValue(this.task.status);
        let a:HTMLElement = rootElement.createEl("a",{text:StatusHumanRedeadable as string});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SelectStatusModal =  new SelectStatusModal(this.task,this.obsidianApp);
        m.open();
    }
}

export class SelectStatusModal extends SuggestModal<string>{

    task:Task;
    validStatusValues:string[];

    constructor(task:Task, app: App) {
        super(app);
        this.task = task;
        this.validStatusValues = this.task.config.validStatusValues.getAllHumanReadableValues();
    }
        
    getSuggestions(query: string): string[] | Promise<string[]> {
        return this.validStatusValues;
    }

    renderSuggestion(value: string, el: HTMLElement) {
        el.createEl("div", { text: value });
    }

    onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent) {
        const id = this.task.config.validStatusValues.getIdFromHumanReadableValue(item);
        this.task.status = id;
        setTimeout(
            () => this.app.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
        ,100)    
    }
}
