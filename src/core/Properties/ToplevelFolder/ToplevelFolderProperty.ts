import { FileModel } from "../../Interfaces/FileModel";
import { Property } from "../../Interfaces/Property";
import { Whitelist } from "../../Whitelist";
import { BasenameProperty } from "../Basename/BasenameProperty";

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

    getFolderPath(root:string,path:string):string{
       const noroot = path.substring(root.length);
       let filename = this.getFilename(path);
       if(filename.charAt(0)=="/"){
        filename = filename.substring(1);
       }
       return noroot.replace(filename,"");
    }

    getFilename(path:string):string{
        //     split into array by /
        //                     take last element of array
        //                                  // remove extension if it exists
        return path.split("/").reverse()[0];
    }

    getNewFullPathWithTopLevelFolder(root:string,path:string,newFoldername:string){       
        const filename = this.getFilename(this.file.path);
        const result = root + "/" + newFoldername + "/" + filename;
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