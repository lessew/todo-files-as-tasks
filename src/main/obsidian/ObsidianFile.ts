import { FileModel } from "src/core/Interfaces/FileModel";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { CachedMetadata, TFile } from "obsidian";


export class ObsidianFile implements FileModel{
    name: string;
    path: string;
    root:string;
    file:TFile;

    private constructor(root:string,path:string){
        this.path = path;
        this.root = root;
    }

    public static create(root:string,path:string):ObsidianFile{
        let f = new ObsidianFile(root,path);
        f.loadTFile();
        return f;
    }

    private loadTFile():void{
        const wrapper = ObsidianWrapper.getInstance();
        this.file = wrapper.getTFile(this.path);
        this.name = this.file.name;
    }

    async move(newPath: string): Promise<void> {
        const wrapper = ObsidianWrapper.getInstance();
        await wrapper.moveFile(this.file,newPath);
    }

    getYAMLProperty(name: string): string | null {
        const meta:CachedMetadata = ObsidianWrapper.getInstance().getMeta(this.file);
        if(meta && meta.frontmatter && meta.frontmatter[name]){
            return meta.frontmatter[name];
        }
        else{
            return null;
        }    
    }
    async setYAMLProperty(name: string, value: string):Promise<void> {
        const obsidianWrapper = ObsidianWrapper.getInstance();
        await obsidianWrapper.setMeta(this.file,name,value);
    }

    static async createMarkdownFile(root:string, path: string): Promise<void> {
        const wrapper = ObsidianWrapper.getInstance();
        await wrapper.createEmptyFile(root + "/" + path);        
    }
}