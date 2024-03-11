import { FileProperty, FilePropertyDAO } from "../../src/core/Files/FileProperty";
import { File } from "../../src/core/Files/File";
import { FileSystemFacade } from "../../src/core/Files/FileSystemFacade";

export class MockFilePropertyDAO implements FilePropertyDAO {
    fp:FileProperty;
    f:File;
    fsf:FileSystemFacade;
    persistedValue:string = "";

    constructor(f:File,fp:FileProperty,fsf:FileSystemFacade){
        this.f = f;
        this.fp = fp;
        this.fsf = fsf;
    }

    persist(val:string):void{
        // nothing
        this.persistedValue = val;
    }

    retrieve():string{
        return this.persistedValue;
    }
}