import { FolderListDAO } from "src/core/Interfaces/FolderListDAO";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { App, TFolder } from "obsidian";

export class FolderList implements FolderListDAO{
    folders:string[];
    
    // TODO create Folder Interface to allow further abstraction from obsidian code
    // TODO create filesystem wrapper which is implemented by obsidianwrapper
     init(rootPath:string):void{
        const wrapper = ObsidianWrapper.getInstance();
        const folders:string[] = FolderList.getFolders(rootPath,wrapper);
        this.folders = folders;
    }

    static getFolders(path:string,wrapper:ObsidianWrapper):string[]{
        const folder = wrapper.getTFolder(path);
        let result:string[] = [];
        
        if(folder instanceof TFolder){
            folder.children.forEach(child => {
                if(child instanceof TFolder){
                    result.push(child.name);
                    result = [...result,...FolderList.getFolders(child.path,wrapper)];
                }
            });
        }       
        return result; 
    }
}