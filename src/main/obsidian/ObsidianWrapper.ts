import { App,TFile,normalizePath, TFolder, CachedMetadata } from "obsidian";
import { MainCodeBlock } from "../MainCodeBlock";
import { Observer } from "src/core/Interfaces/Observer";


/*
** Global singleton that keeps track of 
** - the obsidian app (for file mutation) 
** - File-As-Tasks codeblocks (for refreshing)
*/ 
export class ObsidianWrapper{ // TODO rename to facade
    private static instance:ObsidianWrapper;
    obsidianApp:App;
    rootPath:string;
    observers:Observer[];
   
    public static async init(app:App){
        if(typeof ObsidianWrapper.instance === "undefined"){
            ObsidianWrapper.instance = new ObsidianWrapper();
            ObsidianWrapper.instance.obsidianApp = app;
            ObsidianWrapper.instance.observers = [];
        }
    }

    public static getInstance():ObsidianWrapper{
        return ObsidianWrapper.instance;
    }

    async getTFile(path:string):Promise<TFile>{
        let file = await this.obsidianApp.vault.getAbstractFileByPath(path);
        if(file==null){
            throw new Error(`File not found on disk: ${path}`);
        }
        else{
            return file as TFile;
        }
    }

    async getTFolder(path:string):Promise<TFolder>{
        let folder = await this.obsidianApp.vault.getAbstractFileByPath(path);
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
        await this.delay(150);
    }

    delay(ms:number){
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    async createEmptyFile(path:string):Promise<TFile>{
        return this.obsidianApp.vault.create(path,"");
    }

    async moveFile(tf:TFile,path:string):Promise<void>{
        //await this.obsidianApp.vault.rename(tf,path);
        await this.obsidianApp.fileManager.renameFile(tf,path);
        await this.delay(150);
    }

    normalizePath(rp:string):string{
        return normalizePath(rp);
    }

    subscribe(observer:Observer):void{
        this.observers.push(observer);
    }

    async reload():Promise<void>{
        for(let i=0;i<this.observers.length;i++){
            await this.observers[i].update();
        }
    }
}