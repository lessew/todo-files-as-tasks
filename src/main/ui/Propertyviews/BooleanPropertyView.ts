import { App, MarkdownView, SuggestModal } from "obsidian";
import { BooleanProperty } from "src/core/Properties/BooleanProperty";
import { SuggestWhitelistModal } from "./SuggetWhitelistModal";
import { ObsidianWrapper } from "src/main/obsidian/ObsidianWrapper";

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
        ObsidianWrapper.getInstance().refreshUI();
    }
}