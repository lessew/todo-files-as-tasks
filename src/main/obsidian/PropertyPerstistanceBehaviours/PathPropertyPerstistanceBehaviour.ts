import { TFile } from "obsidian";
import { PropertyModel } from "../../../core/Interfaces/PropertyModel";
import { ObsidianWrapper } from "../ObsidianWrapper";

export class PathPropertyModel implements PropertyModel {
  
    async persist(fileID:string,propertyName:string,val:string):Promise<void>{
        const wrapper = ObsidianWrapper.getInstance();
        const tf:TFile  = wrapper.getTFile(fileID);
        await wrapper.moveFile(tf,val);
    }

    retrieve(fileID:string,propertyName:string):string{
        return fileID;
    }
}