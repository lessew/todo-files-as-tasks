import { TFile } from "obsidian";
import { PropertyDAO } from "../../../core/Interfaces/PropertyDAO";
import { ObsidianWrapper } from "../ObsidianWrapper";

export class PathPropertyDAO implements PropertyDAO {
  
    async persist(fileID:string,propertyName:string,val:string):Promise<void>{
        const wrapper = ObsidianWrapper.getInstance();
        const tf:TFile  = wrapper.getTFile(fileID);
        await wrapper.moveFile(tf,val);
    }

    retrieve(fileID:string,propertyName:string):string{
        return fileID;
    }
}