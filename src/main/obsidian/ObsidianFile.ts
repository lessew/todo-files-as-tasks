import { FileModel } from "src/core/Interfaces/FileModel";
import { ObsidianWrapper } from "./ObsidianWrapper";
import { CachedMetadata, TFile } from "obsidian";


export class ObsidianFile implements FileModel{
    name: string;
    path: string;
    root:string;

    file:TFile;

    constructor(root:string,path:string){
        this.path = path;
        this.root = root;
        const wrapper = ObsidianWrapper.getInstance();
        this.file = wrapper.getTFile(path);
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

    async createMarkdownFile(path: string): Promise<void> {
        const wrapper = ObsidianWrapper.getInstance();
        wrapper.createEmptyFile(path);
    }
}