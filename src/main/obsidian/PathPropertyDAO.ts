import { TFile } from "obsidian";
import { PropertyDAO } from "../../core/Interfaces/PropertyDAO";
import { ObsidianWrapper } from "./ObsidianWrapper";

export class PathPropertyDAO implements PropertyDAO {
  
    persist(fileID:string,propertyName:string,val:string):void{
     
        const obsidianWrapper = ObsidianWrapper.getInstance();
        const tf:TFile  = obsidianWrapper.getTFile(fileID);
        try{
            obsidianWrapper.obsidianApp.vault.rename(tf,val);
        }
        catch(e){
            throw new Error("could not move file")
        }
    }

    retrieve(fileID:string,propertyName:string):string{
        return fileID;
    }

    
/*
    move(newFullPath: string): void{
        this.fileSystemFacade.move(this,newFullPath);
    }
    
    setBasename(name:string):void{
        const newFullPath = this.fullPath.getNewFullPathWithBasename(name);
        this.move(newFullPath);
        this.fullPath.value = newFullPath;
    }

    moveToNewToplevelFolder(folderName:string){
        const newPath = this.fullPath.getNewFullPathWithTopLevelFolder(folderName);
        this.fullPath.value = newPath;
        this.move(newPath);
    }
*/


}