import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolder/ToplevelFolderProperty";
import { App, SuggestModal } from "obsidian";
import { Property } from "src/core/Interfaces/Property";
import { Whitelist } from "src/core/Whitelist";
import { PropertyView } from "src/core/Interfaces/PropertyView";
import { ObsidianWrapper } from "src/main/obsidian/ObsidianWrapper";

export class ToplevelFolderPropertyView extends PropertyView{
    prop:ToplevelFolderProperty;
    obsidianApp:App;

    constructor(prop:ToplevelFolderProperty, app:App){
        super();
        this.obsidianApp = app;
        this.prop = prop;
    }
    build(rootElement:HTMLElement):void{
        const text = this.prop.getValue();
        let a:HTMLElement = rootElement.createEl("span",{text:text,cls:"file-as-task"});
        a.addEventListener("click",this); // executes handleEvent
    }

    
    handleEvent(event:Event){
        const m:ToplevelFolderModal =  new ToplevelFolderModal(this.prop,this.prop.whitelist,(item) => {
            this.prop.setValue(item);
            this.refreshUI();
        },
        this.obsidianApp);
        m.open();
    }

    refreshUI():void{
        ObsidianWrapper.getInstance().reloadUI();
    }
}


class ToplevelFolderModal extends SuggestModal<string>{

    prop:Property;
    validValues:string[];
    onSubmit: (result:string) => void;

    constructor(prop:Property, whitelist:Whitelist, onSubmit: (result:string) => void, app: App) {
        super(app);
        this.prop = prop;
        this.onSubmit = onSubmit;
        this.validValues = whitelist.toArray();
    }
        
    getSuggestions(query: string): string[] | Promise<string[]> {
        return this.validValues;
    }

    renderSuggestion(value: string, el: HTMLElement) {
        el.createEl("div", { text: value });
    }

    onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent) {
        this.onSubmit(item);
    }
}
