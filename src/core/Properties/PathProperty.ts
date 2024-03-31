import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";
import { Property } from "../Property";
import { PropertySettings } from "../PropertySettings";

export class PathProperty extends Property{
    regExp:RegExp = /^[a-zA-Z\/\.]+$/;
  
    constructor(name:string,fileID:string,dao:PropertyDAO,propSettings:PropertySettings){
        super(name,fileID,dao,propSettings);
    }

    validate(newVal:string):boolean{
        const match = this.regExp.test(newVal);
        return match;
    }

    getHref():string{
        return this.fileID;
    }

    getFileExtension():string{
        const s = this.fileID.split("/").reverse()[0].split(".");
        if(s.length>1){
            return "." + s.reverse()[0];
        }
        else{
            return "";
        }
    }

    getFilename():string{
        return this.fileID.split("/").reverse()[0];
    };
    
    getFolderName():string{
        return this.fileID.split("/").reverse()[1];
    }
    
    getFolderPath():string{
        return this.fileID.substring(0,(this.fileID.length - this.getFilename().length))
    }

    getBasename():string{
        return this.getFilename().split(".")[0];
    }

    isMarkdownFile(): boolean {
        return (this.getFileExtension() === ".md");
    }

    getNewFullPathWithBasename(basename:string){ 
        return this.getFolderPath() + basename + this.getFileExtension();
    }

    
    getNewFullPathWithTopLevelFolder(newFoldername:string){
        if(newFoldername==""){
            return this.fileID;
        } 
        const currentPath = this.fileID;
        const strSplit = currentPath.split("/");
        const FOLDER_INDEX = (strSplit.length - 2);
        strSplit[FOLDER_INDEX] = newFoldername;
        const newFolderPath = strSplit.join("/");
        return newFolderPath;
    }


}
    