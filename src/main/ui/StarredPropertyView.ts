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
        console.log("clicked");
        this.task.toggleStarred();
        setTimeout(
            () => this.obsidianApp.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
        ,100) 
    }
}
