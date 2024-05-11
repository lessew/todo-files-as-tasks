import { App, Modal, Setting } from "obsidian";
import { ObsidianWrapper } from "../obsidian/ObsidianWrapper";
import { Settings } from "../../core/Settings";
import { BasenamePropertySettings } from "src/core/Properties/Basename/BasenamePropertySettings";
import { PropertySettings } from "src/core/Interfaces/PropertySettings";
import { stringify } from "querystring";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolder/ToplevelFolderProperty";
import { ToplevelFolderPropertySettings } from "src/core/Properties/ToplevelFolder/ToplevelFolderPropertySettings";
import { BooleanYAMLPropertySettings } from "src/core/Properties/BooleanYAML/BooleanYAMLPropertySettings";
import { WhitelistYAMLPropertySettings } from "src/core/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { createFileAsTask } from "../obsidian/CreateFileAsTask";


export class CreateTaskButtonView{
    obsidianApp:App;
    settings:Settings;
    root:string

    constructor(root:string,app:App,settings:Settings){
        this.obsidianApp = app;
        this.settings = settings;
        this.root = root;
    }

    build(rootElement:HTMLElement):void{
        let a:HTMLElement = rootElement.createEl("a",{text:"new task"});
        a.addEventListener("click",this); // executes handleEvent
    }

    handleEvent(event:Event){
        const m:CreateTaskModal =  new CreateTaskModal(this.obsidianApp,this.settings,async (result:Record<string,string>) => {
            await createFileAsTask(this.root,result,this.settings);
            ObsidianWrapper.getInstance().reload();
        });
        m.open();
    }
}

export class CreateTaskModal extends Modal{
    result:Record<string,string>;
    settings:Settings;
    root:string;

    onSubmit: (result: Record<string,string>) => void;

    constructor(app: App,settings:Settings,onSubmit: (result: Record<string,string>) => void) {
        super(app);
        let result:Record<string,string> = {};
        let map:Map<string,PropertySettings>=settings.getAsMap();
        map.forEach((value,key) =>{
            result[key] = "";
        })
        this.result = result;

        this.onSubmit = onSubmit;
        this.settings = settings;
    }

    onOpen() {
        let { contentEl } = this;
        contentEl.createEl("h1", { text: "New Task" });

        let map:Map<string,PropertySettings> = this.settings.getAsMap();

        map.forEach((value,key) =>{
            let t = value.getType();
            if(t=="basename"){
                this.baseNameSetting(value as BasenamePropertySettings,contentEl);
            }
            else if(t=="toplevelfolder"){
                this.topLevelFolderSetting(value as ToplevelFolderPropertySettings,contentEl);
            }
            else if(t=="booleanYAML"){
                this.booleanYAMLSetting(value as BooleanYAMLPropertySettings,contentEl);
            }
            else if(t=="whitelistYAML"){
                this.whitelistYAMLSetting(value as WhitelistYAMLPropertySettings,contentEl);
            }
        })

       
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

    baseNameSetting(propSetting:BasenamePropertySettings,contentEl:HTMLElement):void{
        new Setting(contentEl)
        .setName(propSetting.propName)
        .addText((text) =>
            text.onChange((value) => {
                this.result[propSetting.propName] = value
            }));
    }

    topLevelFolderSetting(propSetting:ToplevelFolderPropertySettings,contentEl:HTMLElement):void{
        new Setting(contentEl)
            .setName(propSetting.propName)
            .addDropdown((dropdown) =>
                dropdown
                .addOptions(propSetting.whitelist.toRecord())
                .onChange((value) => {
                    this.result[propSetting.propName] = value;
                })
                .setValue(propSetting.defaultValue)
            );
            this.result[propSetting.propName] = propSetting.defaultValue;
    }

    booleanYAMLSetting(propSetting:BooleanYAMLPropertySettings,contentEl:HTMLElement):void{
        new Setting(contentEl)
            .setName(propSetting.propName)
            .addDropdown((dropdown) =>
                dropdown
                .addOptions(propSetting.whitelist.toRecord())
                .onChange((value) => {
                    this.result[propSetting.propName] = value;
                })
                .setValue(propSetting.defaultValue)
            );
            this.result[propSetting.propName] = propSetting.defaultValue;

    }

    whitelistYAMLSetting(propSetting:WhitelistYAMLPropertySettings,contentEl:HTMLElement):void{
        new Setting(contentEl)
            .setName(propSetting.propName)
            .addDropdown((dropdown) =>
                dropdown
                .addOptions(propSetting.whitelist.toRecord())
                .onChange((value) => {
                    this.result[propSetting.propName] = value;
                })
                .setValue(propSetting.defaultValue)
            );
            this.result[propSetting.propName] = propSetting.defaultValue;

    }
}
