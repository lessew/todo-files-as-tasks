import { App, Modal, Setting } from "obsidian";
import { ObsidianWrapper } from "../obsidian/ObsidianWrapper";
import { FATSettings, FATSettingsHelper } from "../FileAsTaskSettings";


export class CreateTaskButtonView{
    obsidianApp:App;
    projects:string[];
    settings:FATSettings;

    constructor(app:App,settings:FATSettings){
        this.obsidianApp = app;
        this.settings = settings;
    }

    build(rootElement:HTMLElement):void{
        let a:HTMLElement = rootElement.createEl("a",{text:"new task"});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:CreateTaskModal =  new CreateTaskModal(this.obsidianApp,this.settings,(result:any) => {
            //FileAsTask.create(result.project,result.title);
           
            ObsidianWrapper.getInstance().reloadUI();
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
            .addOptions(FATSettingsHelper.allowedValuesToRecord(this.settings.project.allowedValues!))
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
