import { App, CachedMetadata, TFile } from "obsidian";
import { ObsidianFile } from "./ObsidianFile";
import { File } from "../core/File"

export class FileSystem{

    rootPath:string;
    obsidianApp:App;
    static DEFAULT_ROOTPATH = "/";

    constructor(app:App){
        this.rootPath = FileSystem.DEFAULT_ROOTPATH;
        this.obsidianApp = app;
    }

    setRootPath(rp:string){
        this.rootPath = rp;
    }

    getAllMarkdowndownFiles():File[]{
        const tf:TFile[] = this.obsidianApp.vault.getMarkdownFiles();
        let files:File[] = [];
        tf.forEach(aFile => {
            const newFile:File = new ObsidianFile(aFile,this.obsidianApp);
            files.push(newFile)
        })
        return files;
    }

    move(newFullPath: string, file:TFile): void {
        try{
            file.vault.rename(file,newFullPath);
        }
        catch(e){
            throw new Error("could not move file")
        }
    }

    getYAMLProperty(name:string,file:TFile): string {
        let meta:CachedMetadata  = this.obsidianApp.metadataCache.getFileCache(file) as CachedMetadata;
        if(meta.frontmatter && meta.frontmatter[name]){
            return meta.frontmatter[name];
        }
        else{
            return "";
        }
    }

    setYAMLProperty(name: string, value: string,file:TFile): void {
        this.obsidianApp.fileManager.processFrontMatter(file,(frontmatter) => {
            frontmatter[name] = value;
        })
    }
    
}