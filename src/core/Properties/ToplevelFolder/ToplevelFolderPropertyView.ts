import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolder/ToplevelFolderProperty";
import { App, SuggestModal } from "obsidian";
import FileAsTaskPlugin from "main";
import { PropertyView } from "../PropertyView";
import { Property } from "../Property";
import { Whitelist } from "../Whitelist";

export class ToplevelFolderPropertyView extends PropertyView{
    prop:ToplevelFolderProperty;
    plugin:FileAsTaskPlugin;

    constructor(prop:ToplevelFolderProperty, plugin:FileAsTaskPlugin){
        super();
        this.plugin = plugin; 
        this.prop = prop;
    }
    build(rootElement:HTMLElement):void{
        const text = this.prop.getValue();
        let a:HTMLElement = rootElement.createEl("span",{text:text,cls:"file-as-task"});
        a.addEventListener("click",this); // executes handleEvent
    }

    
    async handleEvent(event:Event){
        const m:ToplevelFolderModal =  new ToplevelFolderModal(this.prop,this.prop.whitelist,async (item) => {
            await this.prop.setValue(item);
            await this.refreshUI();
        },
        this.plugin.obsidianApp);
        m.open();
    }

    async refreshUI():Promise<void>{
        await this.plugin.reload();
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
