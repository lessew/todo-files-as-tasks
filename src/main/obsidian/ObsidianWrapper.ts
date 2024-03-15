import { App,CachedMetadata,TFile,TFolder,normalizePath } from "obsidian";
import { File } from "src/core/File";
import { TaskFactory } from "../configuration/TaskFactory";

export class ObsidianWrapper{
    private static instance:ObsidianWrapper;
    obsidianApp:App;
    rootPath:string;

    public static init(app:App){
        ObsidianWrapper.instance = new ObsidianWrapper();
        ObsidianWrapper.instance.obsidianApp = app;
    }

    setRootpath(path:string){
        this.rootPath = path;
    }

    public static getInstance():ObsidianWrapper{
        return ObsidianWrapper.instance;
    }

    getTFile(path:string):TFile{
        return this.obsidianApp.vault.getAbstractFileByPath(path) as TFile;
    }

    
    normalizePath(rp:string):string{
        return normalizePath(rp);
    }

    


}