import { FileDAO } from "src/core/Interfaces/FileDAO";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { TFile } from "obsidian";
import { TaskFactory } from "../configuration/TaskFactory";
import { File } from "src/core/File";

export class ObsidianFileDAO implements FileDAO{
   
    async createMarkdownFile(path:string):Promise<File>{
        const wrapper = ObsidianWrapper.getInstance();
        const tFile:TFile = await wrapper.obsidianApp.vault.create(path,"");
        const file = TaskFactory.loadTask(tFile.path);
        return file;
    }
    
}