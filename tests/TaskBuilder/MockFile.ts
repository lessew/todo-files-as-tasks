import { File } from "../../src/core/Files/File";
import { FileSystemFacade } from "../../src/core/Files/FileSystemFacade";
import { FileProperty } from "../../src/core/Files/FileProperty";
import { StringProperty } from "../../src/core/Files/FileProperties/StringProperty";


export class MockFile extends File {
    properties: Record<string, FileProperty>;
   
    constructor(fullPath:string,fs:FileSystemFacade){
        super(fullPath,fs);
              
        this.properties = {
            "status":new StringProperty(this,"Status"),
        }
    }
  }