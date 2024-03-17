import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";
import { AbstractProperty } from "../AbstractProperty";

export class PathProperty extends AbstractProperty{
    regExp:RegExp = /^[a-zA-Z\/\.]+$/;
  
    constructor(name:string,fileID:string,dao:PropertyDAO){
        super(name,fileID,dao);
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
        return this.fileID.substring(0,(this.getValue().length - this.getFilename().length))
    }

    getBasename():string{
        return this.getFilename().split(".")[0];
    }

    isMarkdownFile(): boolean {
        return (this.getFileExtension() === ".md");
    }

    getNewFullPathWithBasename(basename:string){ //replaces setbasename
        return this.getFolderPath() + basename + this.getFileExtension();
    }

    
    getNewFullPathWithTopLevelFolder(newFoldername:string){
        if(newFoldername==""){
            return this.value;
        } 
        const currentPath = this.fileID;
        const strSplit = currentPath.split("/");
        const FOLDER_INDEX = (strSplit.length - 2);
        strSplit[FOLDER_INDEX] = newFoldername;
        const newFolderPath = strSplit.join("/");
        return newFolderPath;
    }


}
    