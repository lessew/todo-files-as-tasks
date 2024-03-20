import { App,MarkdownView,TFile,normalizePath } from "obsidian";

export class ObsidianWrapper{
    private static instance:ObsidianWrapper;
    obsidianApp:App;
    rootPath:string;
   
    public static async init(app:App,rootPath:string){
        ObsidianWrapper.instance = new ObsidianWrapper();
        ObsidianWrapper.instance.obsidianApp = app;
        ObsidianWrapper.instance.rootPath = rootPath;
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

    refreshUI():void{
        setTimeout(
            () => this.obsidianApp.workspace.getActiveViewOfType(MarkdownView)?.previewMode.rerender(true)
        ,100)  
    }

}