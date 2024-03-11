import { FileProperty, FilePropertyDAO } from "../FileProperty";
import { File } from "../File";
import { FileSystemFacade } from "../FileSystemFacade";

export class PathPropertyDAO implements FilePropertyDAO {
    fp:FileProperty;
    f:File;
    fsf:FileSystemFacade;

    constructor(f:File,fp:FileProperty,fsf:FileSystemFacade){
        this.f = f;
        this.fp = fp;
        this.fsf = fsf;
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