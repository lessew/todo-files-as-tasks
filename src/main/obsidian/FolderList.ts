import { FolderListDAO } from "src/core/Interfaces/FolderListDAO";
import { ObsidianWrapper } from "./obsidian-module";
import { TFolder } from "obsidian";

export class FolderList implements FolderListDAO{
    getFolders(rootPath:string):string[]{
        let result:string[] = [];
        const wrapper = ObsidianWrapper.getInstance();
        const rootFolder = wrapper.obsidianApp.vault.getAbstractFileByPath(rootPath);
        if(rootFolder instanceof TFolder){
            rootFolder.children.forEach(child => {
                if(child instanceof TFolder){
                    result.push(child.name);
                }
            });
        }
        return result;
    }
}