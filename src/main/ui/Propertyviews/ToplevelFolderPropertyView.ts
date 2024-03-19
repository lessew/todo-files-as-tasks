import { App, MarkdownView, SuggestModal } from "obsidian";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolderProperty";
import { SuggestWhitelistModal } from "../Modals/SuggetWhitelistModal";
import { WhitelistPropertyView } from "./WhitelistPropertyView";

export class ToplevelFolderPropertyView extends WhitelistPropertyView{
    prop:ToplevelFolderProperty;

   
    build(rootElement:HTMLElement):void{
        const text = this.prop.getValue();
        let a:HTMLElement = rootElement.createEl("span",{text:text});
        a.addEventListener("click",this); // executes handleEvent
    }
}
