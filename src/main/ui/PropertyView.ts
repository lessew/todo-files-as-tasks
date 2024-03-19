import { App, MarkdownView } from "obsidian";

export class PropertyView{
    obsidianApp:App;
    statusNotSet:string = "◌";
    statusInvalid:string = "⊗";

    constructor(app:App){
        this.obsidianApp = app;
    }

    refreshUI():void{
        setTimeout(
            () => this.obsidianApp.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
        ,100)  
    }
}