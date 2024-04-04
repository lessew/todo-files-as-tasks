import { App,TFile,normalizePath, TFolder, CachedMetadata } from "obsidian";
import { Main } from "../Main";


export class ObsidianWrapper{
    private static instance:ObsidianWrapper;
    obsidianApp:App;
    rootPath:string;
    mains:Main[];
   
    public static async init(main:Main, app:App,rootPath:string){
        if(typeof ObsidianWrapper.instance === "undefined"){
            ObsidianWrapper.instance = new ObsidianWrapper();
            ObsidianWrapper.instance.obsidianApp = app;
            ObsidianWrapper.instance.mains = [];
        }
        ObsidianWrapper.instance.rootPath = rootPath;
        ObsidianWrapper.instance.mains.push(main);
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
                this.mains.forEach((main) =>{
                    main.load();
                });
            }
        ,150)  
    }
}