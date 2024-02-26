import { App, SuggestModal } from "obsidian";
import { Task } from "src/core/Task";

export class ProjectPropertyView{
    task:Task;
    app:App;

    constructor(task:Task, app:App){
        this.task = task;
        this.app = app;
    }

    build(rootElement:HTMLElement):void{
        let a:HTMLElement = rootElement.createEl("a",{text:this.task.project});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SelectProjectModal =  new SelectProjectModal(this.task, this.app);
        m.open();
    }
}

export class SelectProjectModal extends SuggestModal<string>{
    task:Task;

    constructor(task:Task, app: App) {
        super(app);
        this.task = task;
    }
        
    getSuggestions(query: string): string[] | Promise<string[]> {
        const projects:string[] = this.task.config.validProjectValues.getAllHumanReadableValues();
        return projects.filter((p) =>
                p.toLowerCase().includes(query.toLowerCase())
        ); 
    }

    renderSuggestion(value: string, el: HTMLElement) {
        el.createEl("div", { text: value });
    }

    onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent) {
        this.task.project = item;
        setTimeout(
            // @ts-ignore
            () => this.app.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
        ,100)   
    }
}
