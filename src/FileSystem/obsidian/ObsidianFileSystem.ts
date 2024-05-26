import { CachedMetadata, TFile, TFolder } from "obsidian";
import FileAsTaskPlugin from "main";
import { FileSystem } from "../FileSystem";

export class ObsidianFileSystem implements FileSystem{
    plugin: FileAsTaskPlugin;
    
    constructor(plugin: FileAsTaskPlugin) {
        this.plugin = plugin;
    }

    readDir(path: string): string[] {
        throw new Error("Method not implemented.");
    }

    pathIsDirectory(path: string): boolean {
        let resource = this.plugin.obsidianApp.vault.getAbstractFileByPath(path);
        return resource instanceof TFolder;
    }

    pathIsFile(path: string): boolean {
        let resource = this.plugin.obsidianApp.vault.getAbstractFileByPath(path);
        return resource instanceof TFile;
    }
    
    private getTFile(path:string):TFile{
        return this.plugin.obsidianFacade.getTFile(path);
    }
    

    async move(currentPath:string,newPath: string): Promise<void> {
        let file = this.getTFile(currentPath);
        await this.plugin.obsidianFacade.moveFile(file,newPath);
    }

    getYAMLProperty(path:string,name: string): string | null{
        let file = this.getTFile(path);
        const meta:CachedMetadata = this.plugin.obsidianFacade.getMeta(file);
        if(meta && meta.frontmatter && meta.frontmatter[name]){
            return meta.frontmatter[name];
        }
        else{
            return null;
        }    
    }

    async setYAMLProperty(path:string,name: string, value: string):Promise<void> {
        let file = this.getTFile(path);
        await this.plugin.obsidianFacade.setMeta(file,name,value);
    }
}