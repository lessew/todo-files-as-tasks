import { App, CachedMetadata, TFile, TFolder, normalizePath } from "obsidian";
import { FileSystem } from "src/core/Files/FileSystemFacade";
import { File } from "src/core/Files/File";
import { Task } from "src/main/configuration/Task";

export class ObsidianFileSystem extends FileSystem{
    obsidianApp:App;   

    constructor(app:App){
        super();
        this.obsidianApp = app;
    }

    normalizePath(rp:string):string{
        return normalizePath(rp);
    }

    getMarkdownFiles(path:string):File[]{
        const tf:TFile[] = this.obsidianApp.vault.getMarkdownFiles();
        let files:File[] = [];
        
        tf.forEach(aFile => {
            const newFile = new Task(aFile.path,this);
            files.push(newFile);
        });
        return files;
    }

    getFolders(path:string):string[]{
        let result:string[] = [];
        const rootFolder = this.obsidianApp.vault.getAbstractFileByPath(path);
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
        const file = new Task(tFile.path,this);
        return file;
    }

    getTFile(path:string):TFile{
        return this.obsidianApp.vault.getAbstractFileByPath(path) as TFile;
    }
    
    move(file: File, newFullPath: string): void {
        const tf:TFile  = this.getTFile(file.fullPath.get())
        try{
            this.obsidianApp.vault.rename(tf,newFullPath);
        }
        catch(e){
            throw new Error("could not move file")
        }
    }

    getYAMLProperty(file: File, name: string): string {
        const tf:TFile  = this.getTFile(file.fullPath.get())
        let meta:CachedMetadata  = this.obsidianApp.metadataCache.getFileCache(tf) as CachedMetadata;
        if(meta && meta.frontmatter && meta.frontmatter[name]){
            return meta.frontmatter[name];
        }
        else{
            return "";
        }
    }

    setYAMLProperty(file: File, name: string, value: string): void {
        const tf:TFile  = this.getTFile(file.fullPath.value)
        this.obsidianApp.fileManager.processFrontMatter(tf,(frontmatter) => {
            frontmatter[name] = value;
        })
        throw new Error("Method not implemented.");
    }
}