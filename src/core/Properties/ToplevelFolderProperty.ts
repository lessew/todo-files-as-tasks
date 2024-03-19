import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";
import { PathProperty } from "./PathProperty";
import { OptionsProperty } from "../Interfaces/Property";

export class ToplevelFolderProperty extends PathProperty implements OptionsProperty{
    allowedValues:string[];

    constructor(name:string,fileID:string,dao:PropertyDAO,vals:string[]){
        super(name,fileID,dao);
        this.allowedValues = vals;
    }
    
    validate(newValue:string){
        return (this.allowedValues.indexOf(newValue) != -1)
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