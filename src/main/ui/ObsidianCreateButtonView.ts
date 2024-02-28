import { App, MarkdownView, Modal, Setting } from "obsidian";
import { TaskConfiguration } from "src/core/TaskConfiguration";
import { FileSystem } from "src/core/FileSystem";
import { Task } from "src/core/Task";


export class ObsidianCreateButtonView{
    config:TaskConfiguration;
    app:App;
    fileSystem:FileSystem;

    constructor(fileSystem:FileSystem,config:TaskConfiguration,app:App){
        this.config = config;
        this.app = app;
        this.fileSystem = fileSystem;
    }

    build(rootElement:HTMLElement):void{
        let a:HTMLElement = rootElement.createEl("a",{text:"new task"});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:CreateTaskModal =  new CreateTaskModal(this.app,this.config,(result:any) => {
            console.log("create: TBI")
            console.log(result.project)
            console.log(result.title);
            Task.createTask(result.title,result.project,this.config,this.fileSystem);
            setTimeout(
                () => this.app.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
            ,100)  
        });
        m.open();
    }
}


class CreateTaskModal extends Modal{
    result:any;
    config:TaskConfiguration;

    onSubmit: (result: string) => void;

    constructor(app: App, config:TaskConfiguration,onSubmit: (result: any) => void) {
        super(app);
        this.result = {
            title: "",
            project: ""
        }
        this.onSubmit = onSubmit;
        this.config = config;
    }

    getProjectValuesInRecord():Record<string,string>{
        const valuesInMap = this.config.validProjectValues.values;
        let valuesInRecord:Record<string,string> = {};

        valuesInMap.forEach((id,val) => {
            valuesInRecord[id] = val;
        });
        return valuesInRecord;
    }
    
    onOpen() {
        let { contentEl } = this;
        contentEl.createEl("h1", { text: "New Task" });

        new Setting(contentEl)
        .setName("Name")
        .addText((text) =>
            text.onChange((value) => {
            this.result.title = value
            }));

       new Setting(contentEl)
        .setName("Project")
        .addDropdown((dropdown) =>
            dropdown
            .addOptions(this.getProjectValuesInRecord())
            .addOption("--Select Project--","--Select Project--")
            .onChange((value) => {
                this.result.project = value
            })
            .setValue("--Select Project--")
        );
        
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