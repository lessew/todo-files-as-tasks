import { File } from "../../FileSystem/File";
import { Property } from "../Property";

export class BasenameProperty implements Property{
    file: File;
    propName:string;
    private val:string;
    defaultValue:string;
    regExp:RegExp = /^[a-zA-Z\/\.]+$/;

    constructor(propName:string,defaultValue:string,file:File){
        this.propName = propName;
        this.defaultValue = defaultValue;
        this.file = file;
    }
   
    // TODO handle duplicate file / file exsists
    async setValue(val: string): Promise<void> {
        const newValue = this.getNewFullPathWithBasename(this.file.fullPath,val);
        await this.file.move(newValue);
    }

    getValue(): string {
        if(this.val===undefined){
            this.val = this.getBasename(this.file.fullPath);
        }
        return this.val
    }


    
    getBasename(path:string):string{
        //     split into array by /
        //                     take last element of array
        //                                  // remove extension if it exists
        return path.split("/").reverse()[0].split(".")[0];
    }

    getNewFullPathWithBasename(path:string,basename:string){ 
        const replaceMe = this.getBasename(path);
        const result = path.replace(replaceMe,basename);
        return result;
    }
}