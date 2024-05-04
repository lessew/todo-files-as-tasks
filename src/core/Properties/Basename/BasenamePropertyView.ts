import { App, Modal,Setting } from "obsidian";
import { PropertyView } from "src/core/Interfaces/PropertyView";
import { BasenameProperty } from "src/core/Properties/Basename/BasenameProperty";
import { ObsidianWrapper } from "src/main/obsidian/ObsidianWrapper";

export class BasenamePropertyView extends PropertyView{
    prop:BasenameProperty;
    obsidianApp:App;

    constructor(prop:BasenameProperty,app:App){
        super();
        this.obsidianApp = app;
        this.prop = prop;
    }

    build(rootElement:HTMLElement):void{
      let edit:HTMLElement = rootElement.createEl("a",{cls:"yatodo-edit",text:this.prop.getValue(),title:"Edit"});
      edit.addEventListener("click",this); // executes this.handleEvent method
    }

    handleEvent(event:Event){
        const m:UpdateBasenameModal =  new UpdateBasenameModal(this.obsidianApp,this.prop.getValue(),(result) => {
            this.prop.setValue(result);
            this.refreshUI();
        });
        m.open();
    }

    refreshUI():void{
      ObsidianWrapper.getInstance().reload();
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
