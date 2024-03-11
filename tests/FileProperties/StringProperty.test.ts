import { StringProperty } from "../../src/core/Files/FileProperties/StringProperty";
import { File } from "../../src/core/Files/File";
import { MockFileSystemFacade } from "./MockFileSystemFacade";
import { FileSystemFacade } from "../../src/core/Files/FileSystemFacade";
import { MockFilePropertyDAO } from "./MockFilePropertyDAO";
import { FilePropertyDAO } from "../../src/core/Files/FileProperty";

class Helper{
    static getStringProperty():StringProperty{
        let fsf:FileSystemFacade = new MockFileSystemFacade();
        let f = new File("/path/",fsf);

        let sp = new StringProperty("StringProperty");
        let dao:FilePropertyDAO = new MockFilePropertyDAO(f,sp,fsf);
        sp.setDAO(dao);
        return sp;
    }
}

describe('stringproperty test', () => {

    let sp = Helper.getStringProperty();
    
    test('correct property name', () => {
        expect(sp.name).toBe("StringProperty");
    });
    test('correct property name', () => {
        sp.value = "shizzle"
        expect(sp.value).toBe("shizzle");
    });


});