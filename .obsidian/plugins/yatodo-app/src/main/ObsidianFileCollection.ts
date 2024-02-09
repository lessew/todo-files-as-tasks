import { FileCollection } from "../core/FileCollection";
import { File } from "../core/File";
import { Vault,TFile,App } from "obsidian";
import { ObsidianFile } from "./ObsidianFile";

export class ObsidianFileCollection implements FileCollection{

    rootPath: string | false;
    files:File[];
    
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