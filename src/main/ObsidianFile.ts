import {File} from "../core/File";
import { App, TFile } from "obsidian";
import { ObsidianFileSystem } from "./ObsidianFileSystem";

export class ObsidianFile extends File{
    file:TFile;
    fileSystem:ObsidianFileSystem;

    constructor(file:TFile,fs:ObsidianFileSystem){
        super(file.path);
        this.file = file;
        this.fileSystem = fs;
    }

    move(newFullPath: string): void {
        try{
            this.file.vault.rename(this.file,newFullPath);
        }
        catch(e){
            throw new Error("could not move file")
        }
    }
    
    getYAMLProperty(name:string): string {
        let meta = this.fileSystem.getYAML(this.file);
        if(meta && meta.frontmatter && meta.frontmatter[name]){
            return meta.frontmatter[name];
        }
        else{
            return "";
        }
    }

    setYAMLProperty(name: string, value: string): void {
        this.fileSystem.setYAMLProperty(name,value,this.file);
    }

}