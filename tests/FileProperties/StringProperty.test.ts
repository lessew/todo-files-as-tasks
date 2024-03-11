import { StringProperty } from "../../src/core/Files/FileProperties/StringProperty";
import { File } from "../../src/core/Files/File";
import { MockFileSystemFacade } from "../Mocks/MockFileSystemFacade";
import { FileSystemFacade } from "../../src/core/Files/FileSystemFacade";


class Helper{
    static getStringProperty():StringProperty{
        let fs:FileSystemFacade = new MockFileSystemFacade();
        let f = new File("/path/",fs);
        let sp = new StringProperty(f,"StringProperty");
        return sp;
    }
}

describe('stringproperty test', () => {
    const sp = Helper.getStringProperty();
    test('correct property name', () => {
        expect(sp.name).toBe("StringProperty");
    });
    test('correct property name', () => {
        sp.value = "shizzle"
        expect(sp.value).toBe("shizzle");
    });


});