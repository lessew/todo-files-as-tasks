import { FileDAO } from "src/core/Interfaces/FileDAO";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { TFile } from "obsidian";
import { FolderList } from "./FolderList";


// TODO add default yaml values
export class ObsidianFileDAO implements FileDAO{
    async createMarkdownFile(path: string): Promise<void> {
        const wrapper = ObsidianWrapper.getInstance();
        const tFile:TFile = await wrapper.obsidianApp.vault.create(path,"");
    }
}