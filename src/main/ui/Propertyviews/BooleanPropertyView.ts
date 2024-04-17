import { App, MarkdownView, SuggestModal } from "obsidian";
import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAMLProperty";
import { SuggestWhitelistModal } from "../Modals/SuggetWhitelistModal";
import { ObsidianWrapper } from "src/main/obsidian/ObsidianWrapper";
import { PropertyView } from "../PropertyView";

export class BooleanPropertyView extends PropertyView{
    prop:BooleanYAMLProperty;
    
    constructor(prop:BooleanYAMLProperty, app:App){
        super(app);
        this.prop = prop;
    }

    build(rootElement:HTMLElement):void{
        let text = "";
        let hover = "";
        this.prop.initializeValue();
        if(!this.prop.loadedValueIsValid()){
            text = this.statusInvalid;
            hover = `Value in system is not a valid value`;
        }
        else if(this.prop.isEmptyValue()){
            text = this.statusNotSet;
            hover = "property has no value or is not set"
        }
        else{
            text = this.prop.getValue();
        }

        let a:HTMLElement = rootElement.createEl("span",{text:text,title:hover});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        this.prop.toggle();
        this.refreshUI();
    }
}