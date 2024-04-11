import { Property } from "../Property";
import { FileModel } from "../Interfaces/FileModel";

export class PathProperty extends Property{
    
    regExp:RegExp = /^[a-zA-Z\/\.]+$/;

    constructor(file:FileModel){
        super(file)
    }

    validate(newVal:string):boolean{
        const match = this.regExp.test(newVal);
        return match;
    }

    getHref():string{
        return this.file.path;
    }

    getFileExtension():string{
        const s = this.file.path.split("/").reverse()[0].split(".");
        if(s.length>1){
            return "." + s.reverse()[0];
        }
        else{
            return "";
        }
    }

    getBasename():string{
        return this.file.path.split("/").reverse()[0].split(".")[0];
    }

    isMarkdownFile(): boolean {
        return (this.getFileExtension() === ".md");
    }

    getValue(): string {
        return this.file.path;
    }

    async setValue(val: string): Promise<void> {
        if(this.validate(val)){
           await this.file.setFullPath(val);
        } // TODO throw error if not validate
    }

}
    