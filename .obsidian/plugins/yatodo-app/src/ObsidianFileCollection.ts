import { FileCollection } from "./FileCollection";
import { File } from "./File";
import { Vault,TFile,App } from "obsidian";
import { ObsidianFile } from "./ObsidianFile";

export class ObsidianFileCollection implements FileCollection{

    rootPath: string | false;
    files:File[];
    
    constructor(rp:string,app:App){
        this.rootPath = rp;
        this.files = [];

        const files = app.vault.getMarkdownFiles()
        //console.log(rp);
        for (let i = 0; i < files.length; i++) {
             //console.log(files[i]);
             if(this.isMatchingPath(files[i].path,this.rootPath)){
                const f:File = new ObsidianFile(files[i] as TFile,app);
                this.files.push(f);
             }
             //console.log(this.files);
        }
    }
    
    isMatchingPath(filepath:string,tomatch:string){
        if(filepath.startsWith(tomatch)){
            //console.log(`MATCHES: ${filepath} and ${tomatch}`)
            return true;
        }
        else{
            //console.log(`Does not match: ${filepath} and ${tomatch}`)
            return false;
        }
    }

    queryAllFromRootPath(): void {
        throw new Error("Method not implemented.");
    }
    isValidPath(): boolean {
        throw new Error("Method not implemented.");
    }
    
}