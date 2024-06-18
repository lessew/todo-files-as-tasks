import { MockFilesystemType } from "../../../src/FileSystem/mock/MockFileTree";
import { BasenamePropertySettings } from "../../../src/Properties/Basename/BasenamePropertySettings";
import { MockFilesystem } from "../../../src/FileSystem/mock/MockFilesystem";
import { MockIOFactory } from "../../../src/FileSystem/mock/MockIOFactory";


describe('basenamepropertysettings: constructor', () => {
    test("correct values", () => {
        let prop = new BasenamePropertySettings("title");
        expect(prop.propName).toBe("title")
    })

    test('propname empty', () =>{
        try{
            let prop = new BasenamePropertySettings("");
            expect(true).toBe(false)
        }
        catch (e) {
            expect(true).toBe(true);
        }
    })
});


describe('basenamepropertysettings: adapt to property', () => {
    let tree: MockFilesystemType = {
        directories: {},
        files: {
            "path/to/file.md": {
                basename: "file",
            }
        }
    }
    let fs = new MockFilesystem(tree);
    let factory = new MockIOFactory(fs);
    let file = factory.createFile("path/to/file.md");
    let propSettings = new BasenamePropertySettings("title");

    let prop = propSettings.adaptToProperty(file);

    test('test if value is loaded correctly', () => {
        expect(prop.getValue()).toBe("file");
    });  
  
}); 
