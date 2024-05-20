import { ObsidianFile } from "./ObsidianFile";
import { BooleanYAMLProperty } from "src/Properties/BooleanYAML/BooleanYAMLProperty";
import { WhitelistYAMLProperty } from "src/Properties/WhitelistYAML/WhitelistYAMLProperty";
import FileAsTaskPlugin from "main";
import { FileAsTask } from "../FileAsTask";
import { PluginSettings } from "src/Configuration/PluginSettings";
import { FileModel } from "../FileModel";
import { FileAsTaskModel } from "../FileAsTaskModel";

export class ObsidianFileAsTaskModel extends FileAsTaskModel{
    fileModel:FileModel;
    plugin:FileAsTaskPlugin;
    pluginSettings:PluginSettings;
    root:string;
    path:string;
    data:Record<string,string>;

    constructor(){super()};

    static async persist(root:string,data:Record<string,string>,plugin:FileAsTaskPlugin):Promise<void>{
        let fm = new ObsidianFileAsTaskModel();
        fm.setData(data);
        fm.setRoot(root);
        fm.setPath(data[FileAsTask.PROJECT_FIELD] + data[FileAsTask.TITLE_FIELD]);
        fm.setPluginSettings(plugin.pluginSettings);
        fm.setPlugin(plugin);

        await fm.createEmptyMarkdownFile();
        fm.persistYAMLProperties();
    }

    setPlugin(p:FileAsTaskPlugin):void{
        this.plugin = p;
    }

    async createEmptyMarkdownFile():Promise<void>{
        let fullPath = this.root + "/" + this.path;
        await this.plugin.obsidianFacade.createEmptyFile(fullPath);
        this.fileModel = ObsidianFile.create(this.root,this.path,this.plugin);
    }
}
