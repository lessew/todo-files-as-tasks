import { FileModel } from "../../FileModel";
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

    async setValue(val: string):Promise<void> {
        if(!this.isValidFolderValue(val)){
            throw new Error(`Cannot move to folder ${val} as it is not part of the list of allowed folder ${this.whitelist.toString()}`);
        }
        const newPath = this.getNewFullPathWithTopLevelFolder(this.file.path,val);
        if(!this.isValidPath(newPath)){
            throw new Error(`Cannot move to path ${newPath} as it is not a valid path`);
        }
        await this.file.move(newPath);
    }

    getValue(): string {
        if(this.val===undefined){
            this.val = this.getFolderName(this.file.path);
            // no error, display value regardless of part of whitelist or not, by design
        }
        return this.val;
    }

    getFolderName(path:string):string{
        // split into array by /
                     // take second element (first element is filename)
        return path.split("/").reverse()[1];
    }
 
    getNewFullPathWithTopLevelFolder(path:string,newFoldername:string){
        const replaceMe = this.getFolderName(path);
        const result = path.replace(replaceMe,newFoldername);
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