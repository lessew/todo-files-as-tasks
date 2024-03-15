import { App, TFile } from "obsidian";
import { ObsidianWrapper, TaskFactory } from "../main-module";
import { File } from "src/core/core-module";
import { FileListDAO } from "src/core/Interfaces/FileListDAO";

export class FileList implements FileListDAO{
    getMarkdownFiles(rootPath:string):File[]{
        const wrapper = ObsidianWrapper.getInstance();

        const tf:TFile[] = wrapper.obsidianApp.vault.getMarkdownFiles();
        let files:File[] = [];
        
        tf.forEach(aFile => {
            if(aFile.path.indexOf(rootPath)>-1){
               const newFile = TaskFactory.loadTask(aFile.path);
               if(newFile.isMarkdownFile()){
                files.push(newFile);
               }
            }
        });
        return files;
    }

    

}