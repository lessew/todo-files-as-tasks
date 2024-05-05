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

    private constructor(root:string,path:string){
        super();
        this.path = path;
        this.root = root;
        this.children = [];
    }

    static create(root:string,path:string):ObsidianFolder{
        let f = new ObsidianFolder(root,path);
        f.load();
        return f;
    }

    private load():void{
        const wrapper = ObsidianWrapper.getInstance();
        this.folder = wrapper.getTFolder(this.path);

        this.name = this.folder.name;

        for(let i=0;i<this.folder.children.length;i++){
            let child = this.folder.children[i];
            if(child instanceof TFolder){
                let childFolder = ObsidianFolder.create(this.root,child.path);
                this.children.push(childFolder);
            }
            else if(child instanceof TFile){
                let childFile = ObsidianFile.create(this.root,child.path);
                this.children.push(childFile);
            }
        }
    }

    async reload():Promise<void>{
        this.children = [];
        this.load();
    }
}