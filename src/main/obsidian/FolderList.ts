import { FolderListDAO } from "src/core/Interfaces/FolderListDAO";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { TFolder } from "obsidian";

export class FolderList implements FolderListDAO{
    folders:string[];
    
    // TODO account for case with nested folders.
    // TODO create Folder Interface to allow further abstraction from obsidian code
    // TODO create filesystem wrapper which is implemented by obsidianwrapper
     init(rootPath:string):void{
        let result:string[] = [];
        const wrapper = ObsidianWrapper.getInstance();
        const rootFolder = wrapper.getTFolder(rootPath);
        if(rootFolder instanceof TFolder){
            rootFolder.children.forEach(child => {
                if(child instanceof TFolder){
                    result.push(child.name);
                }
            });
        }
        else{
            console.log(`error: given rootpath is not a folder: ${rootPath} - ${rootFolder}`)
            console.log(wrapper);
        }
        this.folders = result;
    }

}