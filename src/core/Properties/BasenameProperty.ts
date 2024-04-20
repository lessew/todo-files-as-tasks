import { FileModel } from "../File";
import { Property } from "../Property";

export class BaseNameProperty implements Property{
    file: FileModel;
    private val:string;
    defaultValue:"no-title-provided";
    regExp:RegExp = /^[a-zA-Z\/\.]+$/;

    constructor(file:FileModel){
        this.file = file;
    }
    
    async setValue(val: string): Promise<void> {
        const newValue = this.getNewFullPathWithBasename(this.file.path,val);
        await this.file.move(newValue);
    }

    getValue(): string {
        if(this.val===undefined){
            this.val = this.getBasename(this.file.path);
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