import { PropertyDAO } from "src/core/Interfaces/PropertyDAO";
import { AbstractProperty } from "../../AbstractProperty";

export class PathProperty extends AbstractProperty{
    regExp:RegExp = /^[a-zA-Z\/\.]+$/
  
    constructor(name:string,fileID:string,dao:PropertyDAO){
        super(name,fileID,dao);
    }

    validate(newVal:string):boolean{
        const match = this.regExp.test(newVal);
        return match;
    }

    get filename():string{
        return this.value.split("/").reverse()[0];
    };

    get fileExtension():string{
        const s = this.value.split("/").reverse()[0].split(".");
        if(s.length>1){
            return "." + s.reverse()[0];
        }
        else{
            return "";
        }
    }

    get folderPath():string{
        return this.value.substring(0,(this.value.length - this.filename.length))
    }

    get folderName():string{
        return this.value.split("/").reverse()[1];
    }

    get basename():string{
        return this.filename.split(".")[0];
    }

    isMarkdownFile(): boolean {
        return (this.fileExtension === ".md");
    }

    getNewFullPathWithBasename(basename:string){ //replaces setbasename
        return this.folderPath + basename + this.fileExtension;
    }

    getNewFullPathWithTopLevelFolder(foldername:string){
        if(foldername==""){
            return this.value;
        }
        const currentPath = this.value;
        const strSplit = currentPath.split("/");
        const FOLDER_INDEX = (strSplit.length - 2);
        strSplit[FOLDER_INDEX] = foldername;
        const newFolderPath = strSplit.join("/");
        return newFolderPath;
    }
}
    