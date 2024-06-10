import { Whitelist } from "./Whitelist";

export class PathStrategy{
    allowedFolders:Whitelist;

    updateBasename(newBasename:string,fullPath:string):string{
        const replaceMe = this.getBasename(fullPath);
        const result = fullPath.replace(replaceMe,newBasename);
        return result;
    }

    getBasename(fullPath:string):string{
        //     split into array by /
        //                     take last element of array
        //                                  // remove extension if it exists
        return fullPath.split("/").reverse()[0].split(".")[0];
    }
    
    getFilename(fullPath:string):string{
        //     split into array by /
        //                     take last element of array
        //                                  // remove extension if it exists
        return fullPath.split("/").reverse()[0];
    }

    updateFolder(newFolder:string,fullPath:string):string{
        // => "path","path/to/workproject/this.md","to/newproject"  
        const filename = this.getFilename(fullPath); // => this.md
        const oldpath = this.getFolder(fullPath); // => to/workproject
        const result = fullPath.replace(oldpath,newFolder); // => path/to/newproject/this.md
        return result;
    }

    setFolderlist(folders:string[]):void{
        this.allowedFolders = new Whitelist(folders);
    }

    getFolderlist():Whitelist{
        return this.allowedFolders;
    }

    getFolder(fullPath:string):string{
        let f = this.getFilename(fullPath);
        return fullPath.replace(f,"");
    }

    validate(newValue:string):boolean{
        return false; // tbi
    }

}