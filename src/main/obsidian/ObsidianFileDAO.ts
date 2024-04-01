import { FileDAO } from "src/core/Interfaces/FileDAO";
import { ObsidianWrapper } from "./ObsidianWrapper";


export class ObsidianFileDAO implements FileDAO{
    async createMarkdownFile(path: string): Promise<void> {
        const wrapper = ObsidianWrapper.getInstance();
        await wrapper.obsidianApp.vault.create(path,"");
    }
}