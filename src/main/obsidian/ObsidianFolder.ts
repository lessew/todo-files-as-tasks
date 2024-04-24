import { TFile, TFolder } from "obsidian";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { ObsidianFile } from "./ObsidianFile";
import { FolderModel } from "src/core/Interfaces/FolderModel";
import { FileModel } from "src/core/FileModel";

export class ObsidianFolder extends FolderModel{
    name: string;
    path: string;
    extension:string;
    children: (FolderModel | FileModel)[];
    
    folder:TFolder;

    constructor(path:string){
        super();
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