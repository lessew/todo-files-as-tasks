import { App, MarkdownView, SuggestModal } from "obsidian";
import { OptionsProperty, Property } from "src/core/Interfaces/Property";

export class SuggestWhitelistModal extends SuggestModal<string>{

    prop:OptionsProperty;
    validValues:string[];
    onSubmit: (result:string) => void;

    constructor(prop:OptionsProperty, onSubmit: (result:string) => void, app: App) {
        super(app);
        this.prop = prop;
        this.onSubmit = onSubmit;
        if(typeof this.prop.allowedValues != 'undefined'){
            this.validValues = this.prop.allowedValues ;
        }
        else{
            this.validValues = [];
        }
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
