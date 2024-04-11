import { PropertyModel } from "src/core/Interfaces/PropertyModel";
import { ObsidianWrapper } from "../ObsidianWrapper";
import { CachedMetadata, TFile } from "obsidian";

export class YAMLPropertyModel implements PropertyModel{
    
    persist(fileID: string, propertyName: string, val: string): void {
        const obsidianWrapper = ObsidianWrapper.getInstance();
        const tf:TFile  = obsidianWrapper.getTFile(fileID);
        obsidianWrapper.setMeta(tf,propertyName,val);
    }
    
    retrieve(fileID: string, propertyName: string): string {
        const obsidianWrapper = ObsidianWrapper.getInstance();
        const tf:TFile  = obsidianWrapper.getTFile(fileID);
        
        let meta:CachedMetadata  = obsidianWrapper.getMeta(tf);
        if(meta && meta.frontmatter && meta.frontmatter[propertyName]){
            return meta.frontmatter[propertyName];
        }
        else{
            return "";
        }
    }
    
}