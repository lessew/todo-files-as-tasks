import { App, TFile } from "obsidian";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { TaskFactory } from "../configuration/TaskFactory";
import { File } from "src/core/File";
import { FileListDAO } from "src/core/Interfaces/FileListDAO";
import { FolderList } from "./FolderList";
import { YaTodoPluginSettings } from "../ui/SettingsTab";

export class FileList implements FileListDAO{
    files:File[];

    init(rootPath:string,settings:YaTodoPluginSettings,folderList:FolderList):void{
        const wrapper = ObsidianWrapper.getInstance();

        const tf:TFile[] = wrapper.obsidianApp.vault.getMarkdownFiles();
        let files:File[] = [];
        
        tf.forEach(aFile => {
            if(aFile.path.indexOf(rootPath)>-1){
               const newFile:File = TaskFactory.loadTask(aFile.path,settings,folderList);
               if(newFile.isMarkdownFile()){
                    files.push(newFile);
                }
            }
        });
        this.files = files;
    }
}