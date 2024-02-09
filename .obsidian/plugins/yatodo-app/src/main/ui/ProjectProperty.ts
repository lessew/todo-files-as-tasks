import { App, Modal } from "obsidian";
import { Todo } from "src/core/Todo";

export class ProjectProperty{
    todo:Todo;
    app:App;

    constructor(todo:Todo,app:App){
        this.todo = todo;
        this.app = app;
    }

    build(rootElement:HTMLElement):void{
        let a:HTMLElement = rootElement.createEl("a",{text:this.todo.project});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SelectProjectModal =  new SelectProjectModal(this.app);
        m.open();
        console.log(event.type);
        console.log(this.todo);
        //console.log(`selected: ${title}`);
    }
}

export class SelectProjectModal extends Modal{
    constructor(app: App) {
        super(app);
    }
    
    onOpen() {
        let { contentEl } = this;
        contentEl.setText("Look at me, I'm a modal! 👀");
    }
    
    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}
