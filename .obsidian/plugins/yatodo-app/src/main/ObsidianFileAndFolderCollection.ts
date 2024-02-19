import { FileAndFolderCollection } from "../core/FileAndFolderCollection";
import { File } from "../core/File";
import { Folder } from "src/core/Folder";
import { TFile,App } from "obsidian";
import { ObsidianFile } from "./ObsidianFile";

export class ObsidianFileAndFolderCollection extends FileAndFolderCollection{

    obsidianApp:App;
    
    constructor(rp:string,obsidianApp:App){
        super();
        this.obsidianApp = obsidianApp;
        this.build(rp);
    }

    getAllMarkdowndownFiles():File[]{
        const tf:TFile[] = this.obsidianApp.vault.getMarkdownFiles();
        let files:File[] = [];
        tf.forEach(aFile => {
            const newFile = new ObsidianFile(aFile,this.obsidianApp);
            files.push(newFile)
        })
        return files;
    }

   
}