import { App, Modal,Setting,FileManager } from "obsidian";
import { Task } from "src/core/Task";

export class TitlePropertyView{
    task:Task;
    obsidianApp:App;

    constructor(task:Task,app:App){
        this.task = task;
        this.obsidianApp = app;
    }

    build(rootElement:HTMLElement):void{
      const href = this.task.project + "/" + this.task.title
      
      let title:HTMLElement = rootElement.createEl("a",
          {
            text:this.task.title,
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
        const m:updateTitleModal =  new updateTitleModal(this.obsidianApp,(result) => {
            this.task.title = result;
            setTimeout(
              // @ts-ignore
              () => this.obsidianApp.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
            ,100) 
        });
        m.open();
    }
}

class updateTitleModal extends Modal{
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
