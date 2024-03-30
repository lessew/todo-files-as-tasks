import { App, TFile } from "obsidian";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { Task } from "../Task";
import { File } from "src/core/File";
import { FileListDAO } from "src/core/Interfaces/FileListDAO";
import { FolderList } from "./FolderList";
import { FATPluginSettings } from "../../core/Interfaces/FATPluginSettings";

export class FileList implements FileListDAO{
    files:File[];

    init(rootPath:string,settings:FATPluginSettings,folderList:FolderList):void{
        const wrapper = ObsidianWrapper.getInstance();

// TODO adjust to start iteration from rootfolder, do not query all files
        const tf:TFile[] = wrapper.obsidianApp.vault.getMarkdownFiles();
        let files:File[] = [];
        
        tf.forEach(aFile => {
            if(aFile.path.indexOf(rootPath)>-1){
               const newFile:File = Task.load(aFile.path,settings,folderList);
               if(newFile.isMarkdownFile()){
                    files.push(newFile);
                }
            }
        });
        this.files = files;
    }
}