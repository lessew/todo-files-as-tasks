import { App, MarkdownView, SuggestModal } from "obsidian";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";

export class ToplevelFolderPropertyView{
   
    prop:ToplevelFolderProperty;
    obsidianApp:App;

    constructor(prop:ToplevelFolderProperty, app:App){
        this.prop = prop;
        this.obsidianApp = app;
    }

    build(rootElement:HTMLElement):void{
        const contextHumanReadable = this.prop.getValue();
        let a:HTMLElement = rootElement.createEl("a",{text:contextHumanReadable as string});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SelectToplevelFolderModal =  new SelectToplevelFolderModal(this.prop,this.obsidianApp);
        m.open();
    }
}

export class SelectToplevelFolderModal extends SuggestModal<string>{

    prop:ToplevelFolderProperty;
    validContextValues:string[];

    constructor(prop:ToplevelFolderProperty, app: App) {
        super(app);
        this.prop = prop;
        console.log(prop);
        this.validContextValues = this.prop.allowedValues;
    }
        
    getSuggestions(query: string): string[] | Promise<string[]> {
        return this.validContextValues;
    }

    renderSuggestion(value: string, el: HTMLElement) {
        el.createEl("div", { text: value });
    }

    onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent) {
        //const id = this.task.config.validContextValues.getIdFromHumanReadableValue(item);
        this.prop.setValue(item);
        setTimeout(
            () => this.app.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
        ,100)        
    }
}
