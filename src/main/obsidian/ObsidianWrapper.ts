import { App,CachedMetadata,TFile,TFolder,normalizePath } from "obsidian";
import { File } from "src/core/Files/File";
import { TaskFactory } from "../TaskFactory";

export class ObsidianWrapper{
    private static instance:ObsidianWrapper;
    obsidianApp:App;
    rootPath:string;

    private constructor(){}

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

    getMarkdownFiles(path:string):File[]{
        const tf:TFile[] = this.obsidianApp.vault.getMarkdownFiles();
        let files:File[] = [];
        
        tf.forEach(aFile => {
            const newFile = TaskFactory.createTask(aFile.path)
            files.push(newFile);
        });
        return files;
    }

    getFolders():string[]{
        let result:string[] = [];
        const rootFolder = this.obsidianApp.vault.getAbstractFileByPath(this.rootPath);
        if(rootFolder instanceof TFolder){
            rootFolder.children.forEach(child => {
                if(child instanceof TFolder){
                    result.push(child.name);
                }
            });
        }
        return result;
    }

    async createMarkdownFile(path:string):Promise<File>{
        const tFile:TFile = await this.obsidianApp.vault.create(path,"");
        const file = TaskFactory.createTask(tFile.path);
        return file;
    }
}