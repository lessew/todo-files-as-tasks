import {File} from "../core/File";
import { App, TFile , Vault, CachedMetadata } from "obsidian";


export class ObsidianFile implements File{
    file:TFile;
    path:string;
    app:App

    constructor(file:TFile,app:App){
       this.file = file;
       this.path = file.path;
       this.app = app;
       //console.log(this.file)
    }

    getFileName():string{
        return this.file.name;
    }

    getFileNameWithoutExtension(){
        return this.file.basename;
    }

    isFolder():boolean{
        return false;
    }

    getFolderName(): string {
        if(this.file.parent){
            return this.file.parent.name;
        }
        else{
            return "<not in a folder>";
        }
    }

    isFile(): boolean {
        return false;
    }

    move(newPath: string): void {
        throw Error("to be implemented")  
    }
    
    isMarkdownFile(): boolean {
        return (this.file.extension === "md");
    }

    getYAMLProperty(name:string):string{
        let meta:CachedMetadata  = this.app.metadataCache.getFileCache(this.file) as CachedMetadata;
        if(meta.frontmatter && meta.frontmatter[name]){
            return meta.frontmatter[name];
        }
        else{
            console.log(`Errror: frontmatter value not found in file ${name}`)
            return "";
        }
    }

    setYAMLProperty(prop_name: string, prop_value: string): void {
        //return false;
        throw Error("To be implemented")
    }

    isValidMarkdownFile():boolean{
        return false;//(instanceof this.file == TFile)
       
    }
}