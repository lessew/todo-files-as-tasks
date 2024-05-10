import { FileModel } from "../../Interfaces/FileModel";
import { Property } from "../../Interfaces/Property";
import { Whitelist } from "../../Whitelist";

export class ToplevelFolderProperty implements Property{
    file: FileModel;
    propName: string;
    private val:string;
    whitelist:Whitelist
    regExp:RegExp = /^[a-zA-Z\/\.]+$/;
    defaultValue:string;

    constructor(defaultValue:string,whitelist:Whitelist,file:FileModel){
        this.file = file;
        this.whitelist = whitelist;
        this.defaultValue = defaultValue;
    }

    // TODO handle duplicate file / file exists
    async setValue(val: string):Promise<void> {
        if(!this.isValidFolderValue(val)){
            throw new Error(`Cannot move to folder ${val} as it is not part of the list of allowed folder ${this.whitelist.toString()}`);
        }
        const newPath = this.getNewFullPathWithTopLevelFolder(this.file.root,this.file.path,val);
        if(!this.isValidPath(newPath)){
            throw new Error(`Cannot move to path ${newPath} as it is not a valid path`);
        }
        await this.file.move(newPath);
    }

    getValue(): string {
        if(this.val===undefined){
            this.val = this.getFolderPath(this.file.root,this.file.path);
            // no error, display value regardless of part of whitelist or not, by design
        }
        return this.val;
    }

     getFolderPath(root:string,path:string):string{ // => "path","path/to/workproject/this.md"
       let noroot = path.substring(root.length); // => /to/workproject/this.md
       let filename = this.getFilename(path); // => this.md
       noroot = noroot.replace(filename,""); // /to/workproject/
       if(noroot.charAt(0)=="/"){
            noroot = noroot.substring(1); // => to/workproject/
       } 
       if(noroot.endsWith("/")){
            noroot = noroot.substring(0,noroot.length-1); // => to/workproject
       } 
       if(noroot==""){
            noroot = "./";
       }
       return noroot; // => to/workproject
    }

    getFilename(path:string):string{
        //     split into array by /
        //                     take last element of array
        //                                  // remove extension if it exists
        return path.split("/").reverse()[0];
    }

    getNewFullPathWithTopLevelFolder(root:string,path:string,newFoldername:string){
        // => "path","path/to/workproject/this.md","to/newproject"  
        const filename = this.getFilename(this.file.path); // => this.md
        const oldpath = this.getFolderPath(root,path); // => to/workproject
        const result = path.replace(oldpath,newFoldername); // => path/to/newproject/this.md
        return result;
    }


    isValidFolderValue(newVal:string):boolean{
        return this.whitelist.contains(newVal);
    }

    isValidPath(path:string):boolean{
        return true;
        // TODO implement
        //return this.regExp.test(path);
    }
}