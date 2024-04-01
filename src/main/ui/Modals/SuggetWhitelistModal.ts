import { App, MarkdownView, SuggestModal } from "obsidian";
import { Property } from "src/core/Property";

export class SuggestWhitelistModal extends SuggestModal<string>{

    prop:Property;
    validValues:string[];
    onSubmit: (result:string) => void;

    constructor(prop:Property, onSubmit: (result:string) => void, app: App) {
        super(app);
        this.prop = prop;
        this.onSubmit = onSubmit;
        this.validValues = this.prop.settings.allowedValues!;
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
