import {File} from "../core/File";
import { App, TFile , Vault, CachedMetadata, FileManager } from "obsidian";


export class ObsidianFile extends File{
    file:TFile;
    obsidianApp:App;

    constructor(file:TFile,obsidianApp:App){
        super(file.path);
        this.file = file;
        this.obsidianApp = obsidianApp;
    }

    move(newFullPath: string): void {
        try{
            this.file.vault.rename(this.file,newFullPath);
        }
        catch(e){
            throw new Error("could not move file")
        }
    }
    
    getYAMLProperty(name:string):string{
        let meta:CachedMetadata  = this.obsidianApp.metadataCache.getFileCache(this.file) as CachedMetadata;
        if(meta.frontmatter && meta.frontmatter[name]){
            return meta.frontmatter[name];
        }
        else{
            return "";
        }
    }

    setYAMLProperty(name: string, value: string): void {
        this.obsidianApp.fileManager.processFrontMatter(this.file,(frontmatter) => {
            frontmatter[name] = value;
        })
    }

}