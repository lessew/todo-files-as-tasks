import { App, Modal, Notice, SuggestModal } from "obsidian";
import { Todo } from "src/core/Todo";
import { Folder } from "src/core/Folder";
import { Context } from "src/core/FileProperties";

export class ContextPropertyView{
    todo:Todo;
    obsidianApp:App;

    constructor(todo:Todo, app:App){
        this.todo = todo;
        this.obsidianApp = app;
    }

    build(rootElement:HTMLElement):void{
        let a:HTMLElement = rootElement.createEl("a",{text:this.todo.context as string});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SelectContextModal =  new SelectContextModal(this.todo,this.obsidianApp);
        m.open();
    }
}

export class SelectContextModal extends SuggestModal<Context>{

    todo:Todo;
    folders: Folder[];

    constructor(todo:Todo, app: App) {
        super(app);
        this.todo = todo;
    }
        
    getSuggestions(query: string): Context[] | Promise<Context[]> {
        return Object.values(Context).filter((c) =>
                c.toLowerCase().includes(c.toLowerCase())
        );
    }

    renderSuggestion(value: Context, el: HTMLElement) {
        el.createEl("div", { text: value });
    }

    onChooseSuggestion(item: Context, evt: MouseEvent | KeyboardEvent) {

        this.todo.context = item;
        new Notice(`Selected ${item}`);
        console.log(this);
          // @ts-ignore
          this.app.workspace.activeLeaf.rebuildView();
    }
}
