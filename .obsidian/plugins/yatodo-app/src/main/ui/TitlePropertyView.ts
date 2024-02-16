import { App, Modal,Setting } from "obsidian";
import { Todo } from "src/core/Todo";

export class TitlePropertyView{
    todo:Todo;
    app:App;

    constructor(todo:Todo,app:App){
        this.todo = todo;
        this.app = app;
    }

    build(rootElement:HTMLElement):void{
        let a:HTMLElement = rootElement.createEl("a",{text:this.todo.title});
        a.addEventListener("click",this); // executes this.handleEvent method
    }

    handleEvent(event:Event){
        const m:updateTitleModal =  new updateTitleModal(this.app,(result) => {
            this.todo.title = result;
             // @ts-ignore
             this.app.workspace.activeLeaf.rebuildView();
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
