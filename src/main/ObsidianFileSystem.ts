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
        
        tf.forEach(aFile => {
            const newFile:File = new ObsidianFile(aFile,this);
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

    getYAML(file:TFile):any{
        let meta:CachedMetadata  = this.obsidianApp.metadataCache.getFileCache(file) as CachedMetadata;
        return meta;
    }

    setYAMLProperty(name:string,value:string,file:TFile):void{
        this.obsidianApp.fileManager.processFrontMatter(file,(frontmatter) => {
            frontmatter[name] = value;
        })
    }

    async createMarkdownFile(path:string):Promise<File>{
        const tFile:TFile = await this.obsidianApp.vault.create(path,"");
        const file:File = new ObsidianFile(tFile,this);
        return file;
    }
}