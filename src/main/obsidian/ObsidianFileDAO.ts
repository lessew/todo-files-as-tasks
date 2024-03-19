import { FileDAO } from "src/core/Interfaces/FileDAO";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { TFile } from "obsidian";
import { TaskFactory } from "../configuration/TaskFactory";
import { File } from "src/core/File";
import { FolderList } from "./FolderList";

export class ObsidianFileDAO implements FileDAO{
    async createMarkdownFile(path: string, folderList: FolderList): Promise<void> {
        const wrapper = ObsidianWrapper.getInstance();
        const tFile:TFile = await wrapper.obsidianApp.vault.create(path,"");
    }
    
}