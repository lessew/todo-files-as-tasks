import { YaTodoApp } from "./YaTodoApp";

export abstract class File{

    fullPath:string;
    app:YaTodoApp;

    constructor(fp:string){
        this.fullPath = fp;
    }

    getFileNameFromFullPath():string{
        return this.fullPath.split("/").reverse()[0];
    };

    getFileExtensionFromFullPath():string{
        const s = this.fullPath.split("/").reverse()[0].split(".");
        if(s.length>1){
            return "." + s.reverse()[0];
        }
        else{
            return "";
        }
    }

    getFolderPathFromFullPath():string{
        return this.fullPath.substring(0,(this.fullPath.length - this.getFileNameFromFullPath().length))
    }

    getFolderNameFromFullPath():string{
        return this.fullPath.split("/").reverse()[1];
    }

    getBasenameFromFullPath():string{
        return this.getFileNameFromFullPath().split(".")[0];
    }

    isMarkdownFile(): boolean {
        return (this.getFileExtensionFromFullPath() === ".md");
    }

    setBasename(name:string):void{
        const newFullPath = this.getFolderPathFromFullPath() + name + this.getFileExtensionFromFullPath();
        this.move(newFullPath);
        this.fullPath = newFullPath;
    }

    pathMatches(needle:string):boolean{
        return this.fullPath.startsWith(needle);
    }

    moveToNewToplevelFolder(folderName:string){
        const newPath = this.calculateNewTopLevelFolderPath(folderName);
        this.move(newPath);
    }

    calculateNewTopLevelFolderPath(topLevelFolder:string):string{
        if(topLevelFolder==""){
            return this.fullPath;
        }
        const currentPath = this.fullPath;
        const strSplit = currentPath.split("/");
        const FOLDER_INDEX = (strSplit.length - 2);
        strSplit[FOLDER_INDEX] = topLevelFolder;
        const newFolderPath = strSplit.join("/");


        return newFolderPath;
    }

    abstract getYAMLProperty(name:string):string;
    abstract move(newFullPath:string):void;

    abstract setYAMLProperty(name:string,value:string):void;
}