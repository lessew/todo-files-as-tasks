import FileAsTaskPlugin from "main";
import { App, Modal,Setting } from "obsidian";
import { PropertyView } from "../PropertyView";
import { BasenameProperty } from "./BasenameProperty";

export class BasenamePropertyView extends PropertyView{
    prop:BasenameProperty;
    plugin: FileAsTaskPlugin;

    constructor(prop:BasenameProperty,plugin:FileAsTaskPlugin){
        super();
        this.plugin = plugin;
        this.prop = prop;
    }

    build(rootElement:HTMLElement):void{
      let edit:HTMLElement = rootElement.createEl("a",{cls:"yatodo-edit",text:this.prop.getValue(),title:"Edit"});
      edit.addEventListener("click",this); // executes this.handleEvent method
    }

    async handleEvent(event:Event){
        const m:UpdateBasenameModal =  new UpdateBasenameModal(this.plugin.obsidianApp,this.prop.getValue(),async (result) => {
            await this.prop.setValue(result);
            await this.refreshUI();
        });
        m.open();
    }

    async refreshUI():Promise<void>{
      await this.plugin.reload();
  }
}

class UpdateBasenameModal extends Modal{
    result: string;
    onSubmit: (result: string) => void;
    value:string;

    constructor(app: App, value:string,onSubmit: (result: string) => void) {
        super(app);
        this.value = value;
        this.onSubmit = onSubmit;
    }
    
    onOpen() {
        let { contentEl } = this;
        contentEl.createEl("h1", { text: "Task title (and filename)" });

        new Setting(contentEl)
          .setName("Name")
          .setClass("file-as-task")
          .addText((text) => {
              text.setValue(this.value);
              text.onChange((value) => {
                this.result = value
              });
            })
  
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
