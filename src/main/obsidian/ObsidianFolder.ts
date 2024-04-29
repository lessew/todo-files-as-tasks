import { TFile, TFolder } from "obsidian";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { ObsidianFile } from "./ObsidianFile";
import { FolderModel } from "src/core/Interfaces/FolderModel";
import { FileModel } from "src/core/Interfaces/FileModel";

export class ObsidianFolder extends FolderModel{
    name: string;
    path: string;
    root:string;
    extension:string;
    children: (FolderModel | FileModel)[];
    
    folder:TFolder;

    constructor(root:string,path:string){
        super();
        this.path = path;
        this.root = root;
        this.children = [];
        const wrapper = ObsidianWrapper.getInstance();
        this.folder = wrapper.getTFolder(path);

        this.name = this.folder.name;

        this.folder.children.forEach(child => {
            if(child instanceof TFolder){
                let childFolder = new ObsidianFolder(this.root,child.path);
                this.children.push(childFolder);
            }
            else if(child instanceof TFile){
                let childFile = new ObsidianFile(this.root,child.path);
                this.children.push(childFile);
            }
        });
    }
}