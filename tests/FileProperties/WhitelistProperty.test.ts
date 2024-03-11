import { WhitelistProperty } from "../../src/core/Files/FileProperties/WhiteListProperty";
import { File } from "../../src/core/Files/File";
import { MockFileSystemFacade } from "../Mocks/MockFileSystemFacade";
import { FileSystemFacade } from "../../src/core/Files/FileSystemFacade";


class Helper{
    static getWhitelistProperty(options:string[]):WhitelistProperty{
        let fs:FileSystemFacade = new MockFileSystemFacade();
        let f = new File("/path/",fs);
        let sp = new WhitelistProperty(f,"WhitelistProperty");
        sp.setAllowedValues(options);
        return sp;
    }
}

describe('whitelistproperty test', () => {
    const sp = Helper.getWhitelistProperty(["inbox","next","waiting for"]);
    test('correct property value', () => {
        sp.value = "inbox";
        expect(sp.value).toBe("inbox");
    });
    test('correct property value with whitespaces', () => {
        sp.value = "waiting for";
        expect(sp.value).toBe("waiting for");
    });
    test('incorrect property value', () => {
        sp.value = "incorr";
        expect(sp.value).toBe(WhitelistProperty.INVALID_VALUE);
    });


});