import { AbstractFileProperty } from "../FileProperty";

export class FilePathProperty extends AbstractFileProperty{
    value:string;
    matches(needle:string):boolean{
        if(this.value!==undefined){
            return this.value.startsWith(needle);
        }
        return false;
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
    /*
    setBasename(name:string):void{
        const newFullPath = this.folderPath + name + this.fileExtension;
        this.move(newFullPath);
        this.value = newFullPath;
    }
    */

    /*
    moveToNewToplevelFolder(folderName:string){
        const newPath = this.calculateNewTopLevelFolderPath(folderName);
        this.move(newPath);
    }
    */
    /*
    calculateNewTopLevelFolderPath(topLevelFolder:string):string{
       return this.getNewFullPathWithTopLevelFolder(topLevelFolder);
    }
    */
}
    