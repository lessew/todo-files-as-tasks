import {File} from "../core/File";
import { App, TFile , Vault, CachedMetadata } from "obsidian";


export class ObsidianFile extends File{
    file:TFile;
    app:App;

    constructor(file:TFile,app:App){
        super(file.path);
        this.file = file;
        this.app = app;
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
        let meta:CachedMetadata  = this.app.metadataCache.getFileCache(this.file) as CachedMetadata;
        if(meta.frontmatter && meta.frontmatter[name]){
            return meta.frontmatter[name];
        }
        else{
            return "";
        }
    }

    setYAMLProperty(prop_name: string, prop_value: string): void {
        throw Error("To be implemented")
    }

}