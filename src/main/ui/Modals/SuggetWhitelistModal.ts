import { App, MarkdownView, SuggestModal } from "obsidian";
import { Property } from "src/core/Interfaces/Property";
import { Whitelist } from "src/core/Whitelist";

export class SuggestWhitelistModal extends SuggestModal<string>{

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
