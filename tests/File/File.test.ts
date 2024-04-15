import { MockFile } from "../../tests/Mocks/MockFile";
import { File } from "../../src/main/FileAsTaskFactory";
import { WhitelistProperty } from "../../src/core/Properties/WhitelistProperty";
import { MockPropertyModel } from "../../tests/Mocks/MockPropertyModel";


class Helper{
    static getFile(path:string,status:string,context:string):File{
        let aFile:File = new MockFile(path);
        aFile.properties = {
            "status": new WhitelistProperty(
                "Status-not-used",
                path,
                new MockPropertyModel(status),
                {allowedValues:["Inbox","Done"],defaultValue:""}
            ),
            "context": new WhitelistProperty(
                "Context-not-used",
                path,
                new MockPropertyModel(context),{allowedValues:["Desk","Read"],defaultValue:""}
            )
        }
        return aFile;
    }
}

describe('File: test', () => {
    test('propertyIsSet', () => {    
        let file = Helper.getFile("/path/to/file.md","Inbox","Desk");
        expect(file.propertyIsSet("status")).toBe(true);
        expect(file.propertyIsSet("context")).toBe(true);
        expect(file.propertyIsSet("nonexistent")).toBe(false);
        expect(file.propertyIsSet("")).toBe(false);
    });
    test("ismarkdownfile",() => {
        let file = Helper.getFile("/path/to/file.md","Inbox","Desk");
        expect(file.isMarkdownFile()).toBe(true);
        file = Helper.getFile("/path/to/file.mda","Inbox","Desk");
        expect(file.isMarkdownFile()).toBe(false);
        file = Helper.getFile("/path/to/file","Inbox","Desk");
        expect(file.isMarkdownFile()).toBe(false);
    })
    test("get",() => {
        let file = Helper.getFile("/path/to/file.md","Inbox","Desk");
        expect(file.get("status")).toBe("Inbox");
        expect(file.get("context")).toBe("Desk");
        expect(file.get("nonexistant")).toBe(File.ERR_PROPERTY_INVALID);
    })
});


 