import { App, CachedMetadata, TFile, TFolder, normalizePath } from "obsidian";
import { File } from "../core/File"
import { FileSystem } from "src/core/FileSystem";
import { ObsidianFile } from "./ObsidianFile";

export class ObsidianFileSystem extends FileSystem{
  
    rootPath:string;
    obsidianApp:App;   
    static DEFAULT_ROOTPATH = "/";

    constructor(app:App){
        super();
        this.rootPath = ObsidianFileSystem.DEFAULT_ROOTPATH;
        this.obsidianApp = app;
    }

    setRootPath(rp:string){
        const normalized = normalizePath(rp);
        this.rootPath = normalized;
    }

    getMarkdownFiles():File[]{
        const tf:TFile[] = this.obsidianApp.vault.getMarkdownFiles();
        let files:File[] = [];
        //let folders:Map<string,boolean> = new Map();
        
        tf.forEach(aFile => {
            const newFile:File = new ObsidianFile(aFile,this);
            //if(newFile.pathMatches(this.rootPath)){
                files.push(newFile)
                //folders.set(newFile.getFolderNameFromFullPath(),true)
            //}
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

    getYAMLProperty(name:string,file:TFile):any{
        let meta:CachedMetadata  = this.obsidianApp.metadataCache.getFileCache(file) as CachedMetadata;
        return meta;
    }

    setYAMLProperty(name:string,value:string,file:TFile):void{
        this.obsidianApp.fileManager.processFrontMatter(file,(frontmatter) => {
            frontmatter[name] = value;
        })
    }
}