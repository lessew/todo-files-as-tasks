import { MockFilesystemType } from "../../../tests/Mocks/MockFilesystemType";
import { BasenameProperty } from "../../../src/Properties/Basename/BasenameProperty";
import { MockFilesystem } from "../../../tests/Mocks/MockFilesystem";
import { MockIOFactory } from "../../../tests/Mocks/MockIOFactory";

let tree: MockFilesystemType = {
    directories: {},
    files: {
        "path/to/file.md": {
            basename: "file",
        }
    }
}

class Helper{
    static getBasenameProperty():BasenameProperty{
        let fs = new MockFilesystem(tree);
        let factory = new MockIOFactory(fs);
        let file = factory.createFile("path/to/file.md");

        let prop = new BasenameProperty("title","default",file);
        return prop;
    }
}

describe('basenameproperty:getBasename', () => {
    let prop = Helper.getBasenameProperty();

    test('correct values', () => {
       expect(prop.getBasename("/path/to/workproject/this.md")).toBe("this")
       expect(prop.getBasename("/path/to/workproject/this")).toBe("this")
       expect(prop.getBasename("this")).toBe("this")
       expect(prop.getBasename("/this")).toBe("this")

    });  
    test('incorrect values', () =>{
        expect(prop.getBasename("")).toBe("")
        expect(prop.getBasename(".")).toBe("")
        expect(prop.getBasename("/")).toBe("")
    })
}); 

describe('basenameproperty:getNewFullPathWithBasename', () => {
    let prop = Helper.getBasenameProperty();

    test('correct values', () => {
        expect(prop.getNewFullPathWithBasename("/path/to/workproject/this.md","that"))
        .toBe("/path/to/workproject/that.md");
        expect(prop.getNewFullPathWithBasename("/path/to/workproject/this","that"))
        .toBe("/path/to/workproject/that")
        expect(prop.getNewFullPathWithBasename("this","that"))
        .toBe("that")
    });  
}); 


describe('basenameproperty:getValue', () => {
    let prop = Helper.getBasenameProperty();

    test('correct values', () => {
       expect(prop.getValue()).toBe("file");
    });  
}); 
