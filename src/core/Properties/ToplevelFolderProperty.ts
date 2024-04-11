import { PathProperty } from "./PathProperty";
import { PropertySettings } from "../PropertySettings";
import { FileModel } from "../Interfaces/FileModel";
export abstract class ToplevelFolderProperty extends PathProperty{  
    private value:string;
    settings:PropertySettings;

    constructor(settings:PropertySettings,file:FileModel){
        super(file);
        this.value = this.getFolderName();
        this.settings = settings;
    }
    
    validate(newValue:string){
        return (this.settings.allowedValues?.indexOf(newValue) != -1)
    }
    
    getFolderName():string{
        return this.file.path.split("/").reverse()[1];
    }
        
    getNewFullPathWithTopLevelFolder(newFoldername:string){
        if(newFoldername==""){ // TODO throw error instead of doing nothing
            return this.file.path;
        } 
        const currentPath = this.file.path;
        const strSplit = currentPath.split("/");
        const FOLDER_INDEX = (strSplit.length - 2);
        strSplit[FOLDER_INDEX] = newFoldername;
        const newFolderPath = strSplit.join("/");
        return newFolderPath;
    }

    getValue():string{      
        return this.value;  
    }

    async setValue(val:string){
        const newPath = this.getNewFullPathWithTopLevelFolder(val);
        await this.file.setFullPath(newPath);
    }


}