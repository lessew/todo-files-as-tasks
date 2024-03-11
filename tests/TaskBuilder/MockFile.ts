import { File } from "../../src/core/Files/File";
import { FileSystemFacade } from "../../src/core/Files/FileSystemFacade";
import { FileProperty } from "../../src/core/Files/FileProperty";
import { StringProperty } from "../../src/core/Files/FileProperties/StringProperty";
import { MockFilePropertyDAO } from "../../tests/FileProperties/MockFilePropertyDAO";


export class MockFile extends File {
    properties: Record<string, FileProperty>;
   
    constructor(fullPath:string,fsf:FileSystemFacade){
        super(fullPath,fsf);
              
        let status = new StringProperty("Status");
        let statusDAO = new MockFilePropertyDAO(this,status,fsf)
        status.setDAO(statusDAO);

        let context = new StringProperty("Context");
        let contextDAO = new MockFilePropertyDAO(this,context,fsf)
        context.setDAO(contextDAO);

        this.properties = {
            "status":status,
            "context":context,
        }
    }
  }