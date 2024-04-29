import { App } from "obsidian";

import { PropertyView } from "../PropertyView";
import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAML/BooleanYAMLProperty";

export class BooleanYAMLPropertyView extends PropertyView{
    prop:BooleanYAMLProperty;
    
    constructor(prop:BooleanYAMLProperty, app:App){
        super(app);
        this.prop = prop;
    }

    build(rootElement:HTMLElement):void{
        let text = this.prop.getValue();
        let hover = "";
        /*
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
        */

        let a:HTMLElement = rootElement.createEl("span",{text:text,title:hover});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        this.prop.toggle();
        this.refreshUI();
    }
}