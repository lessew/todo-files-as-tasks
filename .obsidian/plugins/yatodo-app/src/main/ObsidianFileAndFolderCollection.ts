import { FileAndFolderCollection } from "../core/FileAndFolderCollection";
import { File } from "../core/File";
import { Folder } from "src/core/Folder";
import { TFile,App } from "obsidian";
import { ObsidianFile } from "./ObsidianFile";
import { ObsidianFolder } from "./ObsidianFolder";

export class ObsidianFileAndFolderCollection implements FileAndFolderCollection{

    rootPath: string | false;
    files:File[];
    folders:Folder[]; 
    _folderBucket: any;
    
    constructor(rp:string,app:App){
        this.rootPath = rp;
        this.files = [];
        this.folders = [];
        this._folderBucket = {};

        const files = this.getAllMarkdowndownFiles(app);
        for (let i = 0; i < files.length; i++) {
            const f:File = new ObsidianFile(files[i] as TFile,app);

            if(this.pathMatches(f,this.rootPath)){
                this.addToFileList(f);
                this.addFolder(f.getFolderNameFromFullPath());
            }
        }
    }

    private pathMatches(f:File,path:string):boolean{
        return f.pathMatches(path);
    }

    private getAllMarkdowndownFiles(app:App):TFile[]{
        return app.vault.getMarkdownFiles();
    }

    private addToFileList(f:File){
        this.files.push(f);
    }

    private addFolder(folderName:string){
        if(typeof this._folderBucket[folderName] === 'undefined'){
            this._folderBucket[folderName] = true;
            const folder:Folder = new ObsidianFolder(folderName);
            this.folders.push(folder);
        }
    }
}