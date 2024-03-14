import { FileProperty, FilePropertyDAO } from "../../core/AbstractProperty";
import { File } from "../../core/Files/File";

export class PathPropertyDAO implements FilePropertyDAO {
    file:File;
    fileProperty:FileProperty

    constructor(file:File,property:FileProperty){
        this.file = file;
        this.fileProperty = property;
    }

    persist(val:string):void{
        // tbi
        //this.fsf.setYAMLProperty(this.f,this.fp.name,this.fp.value);
    }

    retrieve():string{
        return "";
        //return this.fsf.getYAMLProperty(this.f,this.fp.name);
    }
}