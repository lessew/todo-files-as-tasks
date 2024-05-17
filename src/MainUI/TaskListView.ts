import { ToplevelFolderProperty } from "src/Properties/ToplevelFolder/ToplevelFolderProperty";
import { WhitelistYAMLProperty } from "src/Properties/WhitelistYAML/WhitelistYAMLProperty";
import { BooleanYAMLProperty } from "src/Properties/BooleanYAML/BooleanYAMLProperty";
import { FileAsTaskCollection } from "src/FileSystem/FileAsTaskCollection";
import { FileAsTask } from "src/FileSystem/FileAsTask";
import { PluginSettings } from "src/Configuration/PluginSettings";
import FileAsTaskPlugin from "main";
import { BasenameProperty } from "src/Properties/Basename/BasenameProperty";
import { BasenamePropertyView } from "src/Properties/Basename/BasenamePropertyView";
import { BooleanYAMLPropertyView } from "src/Properties/BooleanYAML/BooleanYAMLPropertyView";
import { LinkView } from "src/Properties/Link/LinkView";
import { ToplevelFolderPropertyView } from "src/Properties/ToplevelFolder/ToplevelFolderPropertyView";
import { WhitelistYAMLPropertyView } from "src/Properties/WhitelistYAML/WhitelistYAMLPropertyView";

export class TaskListView{
    fileAsTaskCollection:FileAsTaskCollection;
    rootElement:HTMLElement;
    plugin:FileAsTaskPlugin;
    
    constructor(fatc:FileAsTaskCollection,plugin:FileAsTaskPlugin){
        this.plugin = plugin;
        this.fileAsTaskCollection = fatc;
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
            const tp = new BasenamePropertyView(prop,this.plugin);
            tp.build(tdTitle);

            let tdTitleLink = row.createEl("td", {});
            const lv = new LinkView("link",prop.file.path);
            lv.build(tdTitleLink);

            // project: not configurable
            let tdProject:HTMLTableCellElement = row.createEl("td", {});
            const pp = new ToplevelFolderPropertyView(
                thisTask.getProperty("project") as ToplevelFolderProperty,
                this.plugin
            );
            pp.build(tdProject);

            // YAML fields: configurarable
            let settings:PluginSettings = this.plugin.pluginSettings;
            let propFields = settings.getAsMap();
            propFields.forEach(propSettings => {
                if(propSettings.getType()=="booleanYAML"){
                    let tdCell:HTMLTableCellElement = row.createEl("td", {})
                    const ss = new BooleanYAMLPropertyView(
                        thisTask.getProperty(propSettings.propName) as BooleanYAMLProperty,this.plugin);
                    ss.build(tdCell);
                }
                else if(propSettings.getType()=="whitelistYAML"){
                    let tdCell:HTMLTableCellElement = row.createEl("td", {})
                    const cc = new WhitelistYAMLPropertyView(
                        thisTask.getProperty(propSettings.propName) as WhitelistYAMLProperty,
                        this.plugin);
                    cc.build(tdCell);
                }
            })
        }
    }
}
