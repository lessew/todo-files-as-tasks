import { TFile, TFolder } from "obsidian";
import { FolderModel } from "src/core/Interfaces/FolderModel";
import { Resource } from "src/core/Interfaces/Resource";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { ObsidianFile } from "./ObsidianFile";

export class ObsidianFolder implements FolderModel{
    name: string;
    path: string;
    extension:string;
    children: Resource[];
    
    folder:TFolder;

    constructor(path:string){
        this.path = path;
        this.children = [];
        const wrapper = ObsidianWrapper.getInstance();
        this.folder = wrapper.getTFolder(path);

        this.name = this.folder.name;

        this.folder.children.forEach(child => {
            if(child instanceof TFolder){
                let childFolder = new ObsidianFolder(child.path);
                this.children.push(childFolder);
            }
            else if(child instanceof TFile){
                let childFile = new ObsidianFile(child.path);
                this.children.push(childFile);
            }
        });
    }
}