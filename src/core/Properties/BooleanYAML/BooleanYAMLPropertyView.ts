import FileAsTaskPlugin from "main";
import { PropertyView } from "src/core/Interfaces/PropertyView";
import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAML/BooleanYAMLProperty";

export class BooleanYAMLPropertyView extends PropertyView{
    prop:BooleanYAMLProperty;
    plugin: FileAsTaskPlugin;

    constructor(prop:BooleanYAMLProperty,plugin:FileAsTaskPlugin){
        super();
        this.plugin = plugin;
        this.prop = prop;
    }

    build(rootElement:HTMLElement):void{
        let text = this.prop.getValue();
        let hover = "";

        let a:HTMLElement = rootElement.createEl("span",{cls:"file-as-task",text:text,title:hover});
        a.addEventListener("click",this); // executes handleEvent
    }

    async handleEvent(event:Event):Promise<void>{
        await this.prop.toggle();
        await this.refreshUI();
    }

    async refreshUI():Promise<void>{
        await this.plugin.reload();
    }
}