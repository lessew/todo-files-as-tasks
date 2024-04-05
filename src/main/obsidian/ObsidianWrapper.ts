import { App,TFile,normalizePath, TFolder, CachedMetadata } from "obsidian";
import { MainCodeBlock } from "../MainCodeBlock";


/*
** Global singleton that keeps track of 
** - the obsidian app (for file mutation) 
** - File-As-Tasks codeblocks (for refreshing)
*/ 
export class ObsidianWrapper{
    private static instance:ObsidianWrapper;
    obsidianApp:App;
    rootPath:string;
    blocks:MainCodeBlock[];
   
    public static async init(app:App){
        if(typeof ObsidianWrapper.instance === "undefined"){
            ObsidianWrapper.instance = new ObsidianWrapper();
            ObsidianWrapper.instance.obsidianApp = app;
            ObsidianWrapper.instance.blocks = [];
        }
    }

    public addMainCodeBlock(block:MainCodeBlock):void{
        this.blocks.push(block);
    }

    public static getInstance():ObsidianWrapper{
        return ObsidianWrapper.instance;
    }

    getTFile(path:string):TFile{
        return this.obsidianApp.vault.getAbstractFileByPath(path) as TFile;
    }

    getTFolder(path:string):TFolder{
        return this.obsidianApp.vault.getAbstractFileByPath(path) as TFolder;
    }

    getMeta(tf:TFile):CachedMetadata{
        return this.obsidianApp.metadataCache.getFileCache(tf) as CachedMetadata;
    }

    setMeta(tf:TFile,propName:string,propValue:string):void{
        this.obsidianApp.fileManager.processFrontMatter(tf,(frontmatter) => {
            frontmatter[propName] = propValue;
        })
    }

    createEmptyFile(path:string):void{
        this.obsidianApp.vault.create(path,"");
    }

    moveFile(tf:TFile,path:string):void{
        this.obsidianApp.vault.rename(tf,path);
    }

    normalizePath(rp:string):string{
        return normalizePath(rp);
    }

    reloadUI():void{
        setTimeout(
            () => {
                this.blocks.forEach((main) =>{
                    //console.log("reloading a main");
                    main.load();
                });
            }
        ,150)  
    }
}