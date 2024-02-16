import { FileAndFolderCollection } from "../core/FileAndFolderCollection";
import { File } from "../core/File";
import { Folder } from "src/core/Folder";
import { TFile,App } from "obsidian";
import { ObsidianFile } from "./ObsidianFile";

export class ObsidianFileAndFolderCollection implements FileAndFolderCollection{

    rootPath: string | false;
    files:File[];
    folders:Folder[]; 
    
    constructor(rp:string,app:App){
        this.rootPath = rp;
        this.files = [];

        const files = app.vault.getMarkdownFiles();
        for (let i = 0; i < files.length; i++) {
            const f:File = new ObsidianFile(files[i] as TFile,app);
            if(f.pathMatches(this.rootPath)){
                this.files.push(f);
            }
        }
    }
}