import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolder/ToplevelFolderProperty";
import { PropertyView } from "../PropertyView";
import { App } from "obsidian";
import { SuggestWhitelistModal } from "../Modals/SuggetWhitelistModal";

export class ToplevelFolderPropertyView extends PropertyView{
    prop:ToplevelFolderProperty;

    constructor(prop:ToplevelFolderProperty, app:App){
        super(app);
        this.prop = prop;
    }
    build(rootElement:HTMLElement):void{
        const text = this.prop.getValue();
        let a:HTMLElement = rootElement.createEl("span",{text:text});
        a.addEventListener("click",this); // executes handleEvent
    }

    
    handleEvent(event:Event){
        const m:SuggestWhitelistModal =  new SuggestWhitelistModal(this.prop,this.prop.whitelist,(item) => {
            this.prop.setValue(item);
            this.refreshUI();
        },
        this.obsidianApp);
        m.open();
    }
}
