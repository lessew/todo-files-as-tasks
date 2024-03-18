import { App, MarkdownView, SuggestModal } from "obsidian";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";
import { SuggestWhitelistModal } from "./SuggetWhitelistModal";

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
        const m:SuggestWhitelistModal =  new SuggestWhitelistModal(this.prop,this.obsidianApp);
        m.open();
    }
}
