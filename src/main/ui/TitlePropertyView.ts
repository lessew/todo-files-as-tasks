import { App, Modal,Setting } from "obsidian";
import { Task } from "src/core/Task";

export class TitlePropertyView{
    task:Task;
    app:App;

    constructor(task:Task,app:App){
        this.task = task;
        this.app = app;
    }

    build(rootElement:HTMLElement):void{
        let edit:HTMLElement = rootElement.createEl("a",{text:this.task.title});
        edit.addEventListener("click",this); // executes this.handleEvent method
    }

    handleEvent(event:Event){
        const m:updateTitleModal =  new updateTitleModal(this.app,(result) => {
            this.task.title = result;
            setTimeout(
              // @ts-ignore
              () => this.app.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
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
