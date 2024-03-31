import { App, TFile } from "obsidian";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { FATPluginSettings, FileAsTask } from "../FileAsTask";
import { File } from "src/core/File";
import { FileListDAO } from "src/core/Interfaces/FileListDAO";
import { FolderList } from "./FolderList";

export class FileList implements FileListDAO{
    files:File[];

    init(rootPath:string,settings:FATPluginSettings):void{
        const wrapper = ObsidianWrapper.getInstance();

        // TODO adjust to start iteration from rootfolder, do not query all files
        const tf:TFile[] = wrapper.obsidianApp.vault.getMarkdownFiles();
        let files:File[] = [];
        
        tf.forEach(aFile => {
            if(aFile.path.indexOf(rootPath)>-1){
               const newFile:File = FileAsTask.load(aFile.path,settings);
               if(newFile.isMarkdownFile()){
                    files.push(newFile);
                }
            }
        });
        this.files = files;
    }
}