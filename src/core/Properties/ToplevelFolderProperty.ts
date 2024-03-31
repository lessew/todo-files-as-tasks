import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";
import { PathProperty } from "./PathProperty";
import { PropertySettings } from "../PropertySettings";
export class ToplevelFolderProperty extends PathProperty{

    constructor(name:string,fileID:string,dao:PropertyDAO,settings:PropertySettings){
        super(name,fileID,dao,settings);
    }
    
    validate(newValue:string){
        return (this.settings.allowedValues?.indexOf(newValue) != -1)
    }
    
    getValue():string{        
        if(typeof this.value === 'undefined'){
            const folderName = this.getFolderName();
            if(this.validate(folderName)){
                this._loadedValueIsValid = true;
            }
            else{
                console.log(`doest not validate: ${folderName}`)

                this._loadedValueIsValid = false; // file is in folder that is not part of the allowed projects
            }
            
            this.value = folderName; 
        }
        return this.value;
    }

    
    setValue(val:string){
        const newPath = this.getNewFullPathWithTopLevelFolder(val);
        this.dao.persist(this.fileID,this.name,newPath);
        
        this.fileID = newPath;
        this.value = val;
    }


}