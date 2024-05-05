import { App, SuggestModal } from "obsidian";
import { WhitelistYAMLProperty } from "src/core/Properties/WhitelistYAML/WhitelistYAMLProperty";
import { Property } from "src/core/Interfaces/Property";
import { Whitelist } from "src/core/Whitelist";
import { ObsidianWrapper } from "src/main/obsidian/ObsidianWrapper";
import { PropertyView } from "src/core/Interfaces/PropertyView";

export class WhitelistYAMLPropertyView extends PropertyView{
    prop:WhitelistYAMLProperty;
    obsidianApp:App;

    constructor(prop:WhitelistYAMLProperty, app:App){
        super();
        this.obsidianApp = app;
        this.prop = prop;
    }

    build(rootElement:HTMLElement):void{
        let text:string = this.prop.getValue();
        let hover:string = "";
        let a:HTMLElement = rootElement.createEl("span",{cls:"file-as-task",text:text,title:hover});
        a.addEventListener("click",this); // executes handleEvent
    }

    async handleEvent(event:Event){
        const m:WhitelistYAMLModal =  new WhitelistYAMLModal(this.prop,this.prop.whitelist,async (item) => {
            await this.prop.setValue(item);
            await this.refreshUI();
        },
        this.obsidianApp);
        m.open();
    }
    
    async refreshUI():Promise<void>{
        await ObsidianWrapper.getInstance().reload();
    }
}


export class WhitelistYAMLModal extends SuggestModal<string>{

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

