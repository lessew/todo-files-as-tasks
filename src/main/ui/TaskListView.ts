import { App, Setting } from "obsidian";
import { BasenamePropertyView } from "../../core/Properties/Basename/BasenamePropertyView";
import { WhitelistYAMLPropertyView } from "../../core/Properties/WhitelistYAML/WhitelistYAMLPropertyView";
import { ToplevelFolderProperty } from "src/core/Properties/ToplevelFolder/ToplevelFolderProperty";
import { ToplevelFolderPropertyView } from "../../core/Properties/ToplevelFolder/ToplevelFolderPropertyView";
import { BooleanYAMLPropertyView } from "../../core/Properties/BooleanYAML/BooleanYAMLPropertyView";
import { FileAsTaskCollection } from "src/core/FileAsTaskCollection";
import { FileAsTask } from "src/core/FileAsTask";
import { BasenameProperty } from "src/core/Properties/Basename/BasenameProperty";
import { WhitelistYAMLProperty } from "src/core/Properties/WhitelistYAML/WhitelistYAMLProperty";
import { BooleanYAMLProperty } from "src/core/Properties/BooleanYAML/BooleanYAMLProperty";
import { LinkView } from "./LinkView";
import { Settings } from "src/core/Settings";
import { ObsidianWrapper } from "../obsidian/ObsidianWrapper";
import { Observer } from "src/core/Interfaces/Observer";

export class TaskListView implements Observer{
    obsidianApp:App;
    fileAsTaskCollection:FileAsTaskCollection;
    settings:Settings;
    rootElement:HTMLElement;
    
    constructor(fatc:FileAsTaskCollection,settings:Settings,app:App){
        this.obsidianApp = app;
        this.fileAsTaskCollection = fatc;
        this.settings = settings;
        ObsidianWrapper.getInstance().subscribe(this);
    }

    async update():Promise<void>{
        this.rootElement.innerHTML = "";
        await this.fileAsTaskCollection.update();
        this.build(this.rootElement);
    }

    build(rootElement:HTMLElement):HTMLElement{
        this.rootElement = rootElement;
        this.createTable(rootElement);
        return rootElement;
    }

    private createTable(parentElementToAttachTableTo:HTMLElement):void{
        let table:HTMLTableElement = parentElementToAttachTableTo.createEl("table",{cls:"yatodo"});
        this.createHeading(table);
        this.createRows(table);
    }

    private createHeading(tableElementToAttachHeadingTo:HTMLTableElement):void{
        let head:HTMLHeadingElement = tableElementToAttachHeadingTo.createEl("thead");
        head.createEl("th",{text:"Task"});
        head.createEl("th",{text:"Link"});
        head.createEl("th",{text:"Project"});
        head.createEl("th",{text:"Starred"});
        head.createEl("th",{text:"Context"});
        head.createEl("th",{text:"Status"});
    }

    private createRows(tableElementToAttachRowTo:HTMLTableElement){
        let taskList = this.fileAsTaskCollection.get();
        for(let i=0;i<taskList.length;i++){
            const thisTask = taskList[i];
            let row:HTMLTableRowElement = tableElementToAttachRowTo.createEl("tr");

            // title: not configurable
            let tdTitle = row.createEl("td", {});
            let prop = thisTask.getProperty(FileAsTask.TITLE_FIELD) as BasenameProperty;
            const tp = new BasenamePropertyView(prop,this.obsidianApp);
            tp.build(tdTitle);

            let tdTitleLink = row.createEl("td", {});
            const lv = new LinkView();
            lv.build(tdTitleLink,"link",prop.file.path);

            // project: not configurable
            let tdProject:HTMLTableCellElement = row.createEl("td", {});
            const pp = new ToplevelFolderPropertyView(
                thisTask.getProperty("project") as ToplevelFolderProperty,
                this.obsidianApp
            );
            pp.build(tdProject);

            // YAML fields: configurarable
            let propFields = this.settings.getAsMap();
            propFields.forEach(propSettings => {
                if(propSettings.getType()=="booleanYAML"){
                    let tdCell:HTMLTableCellElement = row.createEl("td", {})
                    const ss = new BooleanYAMLPropertyView(thisTask.getProperty(propSettings.propName) as BooleanYAMLProperty);
                    ss.build(tdCell);
                }
                else if(propSettings.getType()=="whitelistYAML"){
                    let tdCell:HTMLTableCellElement = row.createEl("td", {})
                    const cc = new WhitelistYAMLPropertyView(
                        thisTask.getProperty(propSettings.propName) as WhitelistYAMLProperty,
                        this.obsidianApp);
                    cc.build(tdCell);
                }
            })
        }
    }
}
