import { FileModel } from "src/core/Interfaces/FileModel";
import { CachedMetadata, TFile } from "obsidian";
import FileAsTaskPlugin from "main";


export class ObsidianFile implements FileModel{
    name: string;
    path: string;
    root:string;
    file:TFile;
    plugin: FileAsTaskPlugin;
    
    private constructor(root:string,path:string,plugin:FileAsTaskPlugin){
        this.path = path;
        this.root = root;
        this.plugin = plugin;
    }

    public static create(root:string,path:string,plugin:FileAsTaskPlugin):ObsidianFile{
        let f = new ObsidianFile(root,path,plugin);
        f.loadTFile();
        return f;
    }

    private loadTFile():void{
        this.file = this.plugin.obsidianFacade.getTFile(this.path);
        this.name = this.file.name;
    }

    async move(newPath: string): Promise<void> {
        await this.plugin.obsidianFacade.moveFile(this.file,newPath);
    }

    getYAMLProperty(name: string): string | null {
        const meta:CachedMetadata = this.plugin.obsidianFacade.getMeta(this.file);
        if(meta && meta.frontmatter && meta.frontmatter[name]){
            return meta.frontmatter[name];
        }
        else{
            return null;
        }    
    }
    async setYAMLProperty(name: string, value: string):Promise<void> {
        await this.plugin.obsidianFacade.setMeta(this.file,name,value);
    }
}