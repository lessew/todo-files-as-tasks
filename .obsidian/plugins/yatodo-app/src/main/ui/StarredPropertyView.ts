import { App, MarkdownView, SuggestModal } from "obsidian";
import { Task } from "src/core/Task";

export class StarredPropertyView{
    task:Task;
    obsidianApp:App;

    constructor(task:Task, app:App){
        this.task = task;
        this.obsidianApp = app;
    }

    build(rootElement:HTMLElement):void{
        const StarredHumanRedeadable = this.task.config.validStarredValues.getValue(this.task.starred);
        let a:HTMLElement = rootElement.createEl("a",{text:StarredHumanRedeadable as string});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SelectStarredModal =  new SelectStarredModal(this.task,this.obsidianApp);
        m.open();
    }
}

export class SelectStarredModal extends SuggestModal<string>{

    task:Task;
    validStarredValues:string[];

    constructor(task:Task, app: App) {
        super(app);
        this.task = task;
        this.validStarredValues = this.task.config.validStarredValues.getAllHumanReadableValues();
    }
        
    getSuggestions(query: string): string[] | Promise<string[]> {
        return this.validStarredValues;
    }

    renderSuggestion(value: string, el: HTMLElement) {
        el.createEl("div", { text: value });
    }

    onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent) {
        const id = this.task.config.validStarredValues.getIdFromHumanReadableValue(item);
        this.task.starred = id;
        setTimeout(
            () => this.app.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
        ,100)    
    }
}
