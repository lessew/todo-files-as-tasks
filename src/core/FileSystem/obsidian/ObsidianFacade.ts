import { App,TFile,normalizePath, TFolder, CachedMetadata } from "obsidian";

export class ObsidianFacade{ 
    obsidianApp:App;
  
    constructor(app:App){
        this.obsidianApp = app;
    }

    getTFile(path:string):TFile{
        let file = this.obsidianApp.vault.getAbstractFileByPath(path);
        if(file==null){
            throw new Error(`File not found on disk: ${path}`);
        }
        else{
            return file as TFile;
        }
    }

    getTFolder(path:string):TFolder{
        let folder = this.obsidianApp.vault.getAbstractFileByPath(path);
        if(folder instanceof TFolder){
            return folder;
        }
        else{
            throw new Error(`Path '${path}' is not recognized as a folder`)
        }
    }

    getMeta(tf:TFile):CachedMetadata{
        return this.obsidianApp.metadataCache.getFileCache(tf) as CachedMetadata;
    }

    async setMeta(tf:TFile,propName:string,propValue:string):Promise<void>{
        await this.obsidianApp.fileManager.processFrontMatter(tf,(frontmatter) => {
            frontmatter[propName] = propValue;
        })
    }

    async createEmptyFile(path:string):Promise<TFile>{
        return this.obsidianApp.vault.create(path,"");
    }

    async moveFile(tf:TFile,path:string):Promise<void>{
        //await this.obsidianApp.vault.rename(tf,path);
        await this.obsidianApp.fileManager.renameFile(tf,path);
    }

    normalizePath(rp:string):string{
        return normalizePath(rp);
    }

}