import { PathProperty } from "../../src/core/Properties/PathProperty";
import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";
import { MockPropertyDAO } from "../../tests/Mocks/MockPropertyDAO";

class Helper{
    static getPathProperty(propName:string,path:string):PathProperty{
        let dao:PropertyDAO = new MockPropertyDAO(path);
        let prop = new PathProperty(propName,path,dao,{defaultValue:""}); // the prop value is also the id of the file

        return prop;
    }
}

describe('pathproperty test validation function', () => {
        let sp = Helper.getPathProperty("path","dummy");

    test('correct values', () => {
        expect(sp.validate("/this/that/such/that/thing.md")).toBe(true);
        expect(sp.validate("./")).toBe(true);
        expect(sp.validate("/this/")).toBe(true); 

    });  
    test('incorrect values', () =>{
        expect(sp.validate("")).toBe(false);
        expect(sp.validate("/this!")).toBe(false);
        expect(sp.validate("/t   his")).toBe(false);

    })
}); 


describe('pathproperty test helper functions', () => {
    let pp = Helper.getPathProperty("path","/path/to/workproject/this.md");
    test('filename', () => {
        expect(pp.getFilename()).toBe("this.md");
    });
    test('fileExtension', () => {
        expect(pp.getFileExtension()).toBe(".md");
    });
    test('folderpath', () => {
        expect(pp.getFolderPath()).toBe("/path/to/workproject/");
    });
    test('basename', () => {
        expect(pp.getBasename()).toBe("this");
    });
    test('folder', () => {
        expect(pp.getFolderName()).toBe("workproject");
    });
    test('ismarkdownfile', () => {
        expect(pp.isMarkdownFile()).toBe(true);
    });
    test('newfolderpath', () => {
        expect(pp.getNewFullPathWithTopLevelFolder("anotherproject")).toBe("/path/to/anotherproject/this.md");
    });
    test('newpath', () => {
        expect(pp.getNewFullPathWithBasename("adjustedfilename")).toBe("/path/to/workproject/adjustedfilename.md");
    });
}); 


describe('pathproperty edge case: filename without extension', () => {
    const pp = Helper.getPathProperty("path","/home/errands/jumbo");

    test('getFileNameFromFullPath', () => {
        expect(pp.getFilename()).toBe("jumbo");
    });
    test('getFileExtensionFromFullPath', () => {
        expect(pp.getFileExtension()).toBe("");
    });
    test('getFolderPathFromFullPath', () => {
        expect(pp.getFolderPath()).toBe("/home/errands/");
    });
    test('getBasenameFromFullPath', () => {
        expect(pp.getBasename()).toBe("jumbo");
    });
    test('isMarkdownFile', () => {
        expect(pp.isMarkdownFile()).toBe(false);
    });
});


describe('pathproperty edge case: filename without extension and no path', () => {
    const pp = Helper.getPathProperty("path","jumbo");

    test('getFileNameFromFullPath', () => {
        expect(pp.getFilename()).toBe("jumbo");
    });
    test('getFileExtensionFromFullPath', () => {
        expect(pp.getFileExtension()).toBe("");
    });
    test('getFolderPathFromFullPath', () => {
        expect(pp.getFolderPath()).toBe("");
    });
    test('getBasenameFromFullPath', () => {
        expect(pp.getBasename()).toBe("jumbo");
    });
    test('isMarkdownFile', () => {
        expect(pp.isMarkdownFile()).toBe(false);
    });
});


describe('testing calculateNewTopLevelFolderPath', () => {
    const pp = Helper.getPathProperty("path","/home/errands/jumbo");

    test('getNewFullPathWithTopLevelFolder valid input', () => {
        expect(pp.getNewFullPathWithTopLevelFolder("work")).toBe("/home/work/jumbo");
    });
    test('getNewFullPathWithTopLevelFolder no input', () => {
        expect(pp.getNewFullPathWithTopLevelFolder("")).toBe("/home/errands/jumbo");
    });

    const pp2 = Helper.getPathProperty("path","/home/errands/errands/jumbo");

    test('getNewFullPathWithTopLevelFolder two folder in path with same name: valid input', () => {
        expect(pp2.getNewFullPathWithTopLevelFolder("work")).toBe("/home/errands/work/jumbo");
    });
    test('getNewFullPathWithTopLevelFolder two folder in path with same name: no input', () => {
        expect(pp2.getNewFullPathWithTopLevelFolder("")).toBe("/home/errands/errands/jumbo");
    });
});

describe('testing matches edge case with starting and without starting slash', () => {
    const pp = Helper.getPathProperty("path","/home/errands/jumbo");

    test('match with starting slash', () => {
        expect(pp.matches("/home/errands")).toBe(true);
    });
    test('no match without starting slash', () => {
        expect(pp.matches("home/errands")).toBe(false);
    });
}); 


describe('testing getNewFullPathWithBasename', () => {
    const prop = Helper.getPathProperty("path","/home/errands/jumbo.md");

    test('getNewFullPathWithTopLevelFolder valid input', () => {
        expect(prop.getNewFullPathWithBasename("albertheijn")).toBe("/home/errands/albertheijn.md");
    });

});

