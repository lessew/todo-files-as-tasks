import { App, MarkdownView, SuggestModal } from "obsidian";
import { BooleanProperty } from "src/core/Properties/BooleanProperty";

export class BooleanPropertyView{
   
    prop:BooleanProperty;
    obsidianApp:App;

    constructor(prop:BooleanProperty, app:App){
        this.prop = prop;
        this.obsidianApp = app;
    }

    build(rootElement:HTMLElement):void{
        const contextHumanReadable = this.prop.getValue();
        let a:HTMLElement = rootElement.createEl("a",{text:contextHumanReadable as string});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SelectBooleanModal =  new SelectBooleanModal(this.prop,this.obsidianApp);
        m.open();
    }
}

export class SelectBooleanModal extends SuggestModal<string>{

    prop:BooleanProperty;
    validContextValues:string[];

    constructor(prop:BooleanProperty, app: App) {
        super(app);
        this.prop = prop;
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
