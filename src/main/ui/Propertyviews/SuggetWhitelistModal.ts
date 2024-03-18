import { App, MarkdownView, SuggestModal } from "obsidian";
import { Property } from "src/core/Interfaces/Property";
import { ObsidianWrapper } from "src/main/obsidian/ObsidianWrapper";

export class SuggestWhitelistModal extends SuggestModal<string>{

    prop:Property;
    validContextValues:string[];

    constructor(prop:Property, app: App) {
        super(app);
        this.prop = prop;
        if(typeof this.prop.allowedValues != 'undefined'){
            this.validContextValues = this.prop.allowedValues ;
        }
        else{
            this.validContextValues = [];
        }
    }
        
    getSuggestions(query: string): string[] | Promise<string[]> {
        return this.validContextValues;
    }

    renderSuggestion(value: string, el: HTMLElement) {
        el.createEl("div", { text: value });
    }

    onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent) {
        this.prop.setValue(item);
        ObsidianWrapper.getInstance().refreshUI();
    }
}
