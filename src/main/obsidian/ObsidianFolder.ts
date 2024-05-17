import { TFile, TFolder } from "obsidian";
import { ObsidianFile } from "./ObsidianFile";
import { FolderModel } from "src/core/Interfaces/FolderModel";
import { FileModel } from "src/core/Interfaces/FileModel";
import FileAsTaskPlugin from "main";

export class ObsidianFolder extends FolderModel{
    plugin:FileAsTaskPlugin;
    name: string;
    path: string;
    root:string;
    extension:string;
    children: (FolderModel | FileModel)[];

    folder:TFolder;

    private constructor(root:string,path:string,plugin:FileAsTaskPlugin){
        super();
        this.path = path;
        this.root = root;
        this.children = [];
        this.plugin = plugin;
    }

    static create(root:string,path:string, plugin:FileAsTaskPlugin):ObsidianFolder{
        let f = new ObsidianFolder(root,path,plugin);
        f.load();
        return f;
    }

    private load():void{
        this.folder = this.plugin.obsidianFacade.getTFolder(this.path);

        this.name = this.folder.name;

        for(let i=0;i<this.folder.children.length;i++){
            let child = this.folder.children[i];
            if(child instanceof TFolder){
                let childFolder = ObsidianFolder.create(this.root,child.path,this.plugin);
                this.children.push(childFolder);
            }
            else if(child instanceof TFile){
                let childFile = ObsidianFile.create(this.root,child.path,this.plugin);
                this.children.push(childFile);
            }
        }
    }

    async reload():Promise<void>{
        this.children = [];
        this.load();
    }
}