import { App, Modal, Notice, SuggestModal } from "obsidian";
import { Todo } from "src/core/Todo";
import { Folder } from "src/core/Folder";

export class ProjectPropertyView{
    todo:Todo;
    app:App;
    folders:Folder[];

    constructor(todo:Todo,folders:Folder[], app:App){
        this.todo = todo;
        this.app = app;
        this.folders = folders;
    }

    build(rootElement:HTMLElement):void{
        let a:HTMLElement = rootElement.createEl("a",{text:this.todo.project});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:SelectProjectModal =  new SelectProjectModal(this.todo, this.folders,this.app);
        m.open();
    
      
    }
}

export class SelectProjectModal extends SuggestModal<Folder>{

    todo:Todo;
    folders: Folder[];

    constructor(todo:Todo, folders:Folder[], app: App) {
        super(app);
        this.folders = folders;
        this.todo = todo;
    }
        
    getSuggestions(query: string): Folder[] | Promise<Folder[]> {
        console.log(this.folders);
        console.log(query);
        return this.folders.filter((folder) =>
                folder.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    renderSuggestion(value: Folder, el: HTMLElement) {
        el.createEl("div", { text: value.name });
        //el.createEl("small", { text: book.author });
    }

    onChooseSuggestion(item: Folder, evt: MouseEvent | KeyboardEvent) {
        this.todo.project = item.name;
        //new Notice(`Selected ${item.name}`);
        console.log(this);
          // @ts-ignore
          this.app.workspace.activeLeaf.rebuildView();
    }
}
