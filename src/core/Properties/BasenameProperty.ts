import { PathProperty } from "./PathProperty";
import { FileModel } from "../Interfaces/FileModel";

export class BasenameProperty extends PathProperty{

    constructor(file:FileModel){
        super(file);
    }

    getNewFullPathWithBasename(basename:string){ 
        return this.file.parent.path + basename + this.getFileExtension();
    }

    // TODO: run unit tests
    validate(newValue:string):boolean{
        if(newValue.match(/[a-zA-Z_-]/g)){
            return true;
        }
        else{
            return false;
        }
    }

    getValue():string{        
        if(typeof this.value === 'undefined'){
            this.value = this.getBasename(); 
        }
        return this.value;
    }

    async setValue(val:string):Promise<void>{
        const newPath = this.getNewFullPathWithBasename(val);
        await this.file.setFullPath(newPath);
    }
}