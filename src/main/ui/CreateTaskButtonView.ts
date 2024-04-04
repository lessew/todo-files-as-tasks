import { App, Modal, Setting } from "obsidian";
import { ObsidianWrapper } from "../obsidian/ObsidianWrapper";
import { FolderList } from "../obsidian/FolderList";
import { ObsidianFileDAO } from "../obsidian/ObsidianFileDAO";
import { FileAsTask } from "../FileAsTask";
import { FATSettings } from "../FileAsTaskSettings";


export class CreateTaskButtonView{
    obsidianApp:App;
    projects:string[];

    constructor(app:App,settings:FATSettings){
        this.obsidianApp = app;
        this.projects = settings.project.allowedValues as string[];
    }

    build(rootElement:HTMLElement):void{
        let a:HTMLElement = rootElement.createEl("a",{text:"new task"});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:CreateTaskModal =  new CreateTaskModal(this.obsidianApp,this.projects,(result:any) => {
            //FileAsTask.create(result.project,result.title);
           
            ObsidianWrapper.getInstance().refreshUI();
        });
        m.open();
    }
}

// TODO: add properties and settings to dropdown
class CreateTaskModal extends Modal{
    result:any;
    settings:FATSettings;

    onSubmit: (result: string) => void;

    constructor(app: App,settings:FATSettings,onSubmit: (result: any) => void) {
        super(app);
        this.result = {
            title: "",
            project: ""
        }
        this.onSubmit = onSubmit;
        this.settings = settings;
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
            //.addOptions(this.folderList.getFoldersAsRecord())
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
