import { App, Modal,Setting } from "obsidian";
import { BasenameProperty } from "src/core/Properties/BasenameProperty";
import { ObsidianWrapper } from "src/main/obsidian/ObsidianWrapper";
import { PropertyView } from "../PropertyView";

export class BasenamePropertyView extends PropertyView{
    prop:BasenameProperty;

    constructor(prop:BasenameProperty,app:App){
        super(app);
        this.prop = prop;
    }

    build(rootElement:HTMLElement):void{
      const href = this.prop.getHref();
      
      let title:HTMLElement = rootElement.createEl("a",
          {
            text:this.prop.getValue(),
            href:href,
            cls:"internal-link",
            attr:{
              target:"_blank",
              ["data-href"]:href
            }
        }
      );
      let edit:HTMLElement = rootElement.createEl("a",{cls:"yatodo-edit",text:"[e]"});
      edit.addEventListener("click",this); // executes this.handleEvent method
    }

    handleEvent(event:Event){
        const m:UpdateBasenameModal =  new UpdateBasenameModal(this.obsidianApp,(result) => {
            this.prop.setValue(result);
            this.refreshUI();
        });
        m.open();
    }
}

class UpdateBasenameModal extends Modal{
    result: string;
    onSubmit: (result: string) => void;

    constructor(app: App, onSubmit: (result: string) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }
    
    onOpen() {
        let { contentEl } = this;
        contentEl.createEl("h1", { text: "Title" });

    new Setting(contentEl)
      .setName("Name")
      .addText((text) =>
        text.onChange((value) => {
          this.result = value
        }));

    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Submit")
          .setCta()
          .onClick(() => {
            this.close();
            this.onSubmit(this.result);
          }));
    }
    
    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}
