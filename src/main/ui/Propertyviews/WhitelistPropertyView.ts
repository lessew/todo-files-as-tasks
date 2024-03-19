import { App, MarkdownView, SuggestModal } from "obsidian";
import { WhitelistProperty } from "src/core/Properties/WhitelistProperty";
import { SuggestWhitelistModal } from "../Modals/SuggetWhitelistModal";
import { PropertyView } from "../PropertyView";

export class WhitelistPropertyView extends PropertyView{
    prop:WhitelistProperty;

    constructor(prop:WhitelistProperty, app:App){
        super(app);
        this.prop = prop;
    }

    build(rootElement:HTMLElement):void{
        let text:string = "";
        let hover:string = "";
        this.prop.initializeValue();
        if(!this.prop.loadedValueIsValid()){
            text = this.statusInvalid;
            hover = `Value in system is not a valid value`;
        }
        else if(this.prop.isEmptyValue()){
            text = this.statusNotSet;
            hover = "Property has no value or is not set"
        }
        else{
            text = this.prop.getValue();
        }
        let a:HTMLElement = rootElement.createEl("span",{text:text,title:hover});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SuggestWhitelistModal =  new SuggestWhitelistModal(this.prop,(item) => {
            this.prop.setValue(item);
            this.refreshUI();
        },
        this.obsidianApp);
        m.open();
    }
}
