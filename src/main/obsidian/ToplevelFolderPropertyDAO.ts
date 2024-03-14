import { FileProperty, FilePropertyDAO } from "../../core/AbstractProperty";
import { File } from "../../core/Files/File";
import { FileSystemFacade } from "../FileSystemFacade";

export class ToplevelFolderPropertyDAO implements FilePropertyDAO {
    fp:FileProperty;
    f:File;
    fsf:FileSystemFacade;
    path:string;

    constructor(f:File,fp:FileProperty,fsf:FileSystemFacade){
        this.f = f;
        this.fp = fp;
        this.fsf = fsf;
    }

    persist(val:string):void{
        // tbi, move file to new folder
    }

    retrieve():string{
        return "";
        //return this.fsf.getYAMLProperty(this.f,this.fp.name);
    }
}