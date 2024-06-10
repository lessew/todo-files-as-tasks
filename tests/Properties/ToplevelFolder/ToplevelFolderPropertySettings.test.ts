import { MockFilesystem } from "../../../src/FileSystem/mock/MockFilesystem";
import { ToplevelFolderPropertySettings } from "../../../src/Properties/ToplevelFolder/ToplevelFolderPropertySettings";
import { Whitelist } from "../../../src/Properties/Whitelist";
import { MockIOFactory } from "../../../src/FileSystem/mock/MockIOFactory";
import { MockFilesystemType } from "../../../src/FileSystem/mock/MockFileTree";
import { File } from "../../../src/FileSystem/File";

class Helper{
    static getFile():File{
        let tree: MockFilesystemType = {
            directories: {},
            files: {
                "path/to/home/file.md": {
                    basename: "file",
                }
            }
        }

        let fs = new MockFilesystem(tree);
        let factory = new MockIOFactory(fs);
        let file = factory.createFile("path/to/file");
        return file;
    }
}


describe('toplevelfolderpropertysettings: constructor', () => {

    test('correct values', () => {
        let prop = new ToplevelFolderPropertySettings("project");
        expect(prop.propName).toBe("project")
    });  
    test('propname empty', () =>{
        try{
            let prop = new ToplevelFolderPropertySettings("");
            expect(true).toBe(false)
        }
        catch(e){
            expect(true).toBe(true);
        }
    })
}); 



describe('toplevelfolderpropertysettings: adapt to property', () => {
    let propSettings = new ToplevelFolderPropertySettings("title");
    propSettings.setDefaultValue("home");
    propSettings.setProjects(new Whitelist(["home","work"]));
    let file = Helper.getFile();
    let prop = propSettings.adaptToProperty(file);
    test('test if value is loaded correctly', () => {
        expect(prop.getValue()).toBe("home");
    });  
});

describe('toplevelfolderpropertysettings: adapt to property with wrong input - defaultvalue not set', () => {
    let propSettings = new ToplevelFolderPropertySettings("title");
    propSettings.setProjects(new Whitelist(["home","work"]));
    const file = Helper.getFile();

    test('test if error is thrown correctly', () => {
        expect(() => {
            propSettings.adaptToProperty(file)
        }).toThrow("Error: default value for toplevelfolder title is not set")
        
    });  
});


describe('toplevelfolderpropertysettings: adapt to property with wrong input - whitelist not set', () => {
    let propSettings = new ToplevelFolderPropertySettings("title");
    propSettings.setDefaultValue("home");
    let file = Helper.getFile();

    test('test if error is thrown correctly', () => {
        expect(() => {
            propSettings.adaptToProperty(file)
        }).toThrow("Error: whitelist for toplevelfolder title is not set")
        
    });  
});
