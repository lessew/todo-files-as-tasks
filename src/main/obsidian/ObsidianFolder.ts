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
    }

    static async create(root:string,path:string):Promise<ObsidianFolder>{
        let f = new ObsidianFolder(root,path);
        await f.load();
        return f;
    }

    private async load():Promise<void>{
        const wrapper = ObsidianWrapper.getInstance();
        this.folder = await wrapper.getTFolder(this.path);

        this.name = this.folder.name;

        for(let i=0;i<this.folder.children.length;i++){
            let child = this.folder.children[i];
            if(child instanceof TFolder){
                let childFolder = await ObsidianFolder.create(this.root,child.path);
                this.children.push(childFolder);
            }
            else if(child instanceof TFile){
                let childFile = await ObsidianFile.create(this.root,child.path);
                this.children.push(childFile);
            }
        }
    }

    async reload():Promise<void>{
        this.children = [];
        await this.load();
    }
}