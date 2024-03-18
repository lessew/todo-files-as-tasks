import { App, MarkdownView, SuggestModal } from "obsidian";
import { BooleanProperty } from "src/core/Properties/BooleanProperty";
import { SuggestWhitelistModal } from "./SuggetWhitelistModal";

export class BooleanPropertyView{
   
    prop:BooleanProperty;
    obsidianApp:App;

    constructor(prop:BooleanProperty, app:App){
        this.prop = prop;
        this.obsidianApp = app;
    }

    build(rootElement:HTMLElement):void{
        let a:HTMLElement = rootElement.createEl("span",{text:this.prop.getValue()});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        this.prop.toggle();
        setTimeout(
            () => this.obsidianApp.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
        ,100)  
        //m.open();
    }
}