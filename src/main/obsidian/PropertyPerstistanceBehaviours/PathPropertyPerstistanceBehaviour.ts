import { TFile } from "obsidian";
import { PropertyPerstistenceStrategy } from "../../../core/Interfaces/PropertyPerstistenceStrategy";
import { ObsidianWrapper } from "../ObsidianWrapper";

export class PathPropertyPerstistenceStrategy implements PropertyPerstistenceStrategy {
  
    async persist(fileID:string,propertyName:string,val:string):Promise<void>{
        const wrapper = ObsidianWrapper.getInstance();
        const tf:TFile  = wrapper.getTFile(fileID);
        await wrapper.moveFile(tf,val);
    }

    retrieve(fileID:string,propertyName:string):string{
        return fileID;
    }
}