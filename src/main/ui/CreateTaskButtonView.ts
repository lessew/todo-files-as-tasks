import { App, Modal, Setting } from "obsidian";
import { ObsidianWrapper } from "../obsidian/ObsidianWrapper";
import { FolderList } from "../obsidian/FolderList";
import { ObsidianFileDAO } from "../obsidian/ObsidianFileDAO";


export class CreateTaskButtonView{
    obsidianApp:App;
    projects:FolderList;

    constructor(app:App,folderList:FolderList){
        this.obsidianApp = app;
        this.projects = folderList;
    }

    build(rootElement:HTMLElement):void{
        let a:HTMLElement = rootElement.createEl("a",{text:"new task"});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:CreateTaskModal =  new CreateTaskModal(this.obsidianApp,this.projects.folders,(result:any) => {
            let dao = new ObsidianFileDAO();
            const path = ObsidianWrapper.getInstance().rootPath + "/" + result.project + "/" + result.title + ".md";
            dao.createMarkdownFile(path,this.projects);
            ObsidianWrapper.getInstance().refreshUI();
        });
        m.open();
    }
}


class CreateTaskModal extends Modal{
    result:any;
    folderList:string[];

    onSubmit: (result: string) => void;

    constructor(app: App,folderList:string[],onSubmit: (result: any) => void) {
        super(app);
        this.result = {
            title: "",
            project: ""
        }
        this.onSubmit = onSubmit;
        this.folderList = folderList;
    }

    getProjectValuesInRecord():Record<string,string>{
        let projects:Record<string,string> = {};
        for(let i=0;i<this.folderList.length;i++){
            projects[this.folderList[i]] = this.folderList[i];
        }
        return projects;
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
