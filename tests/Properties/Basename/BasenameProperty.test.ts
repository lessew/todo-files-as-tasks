import { MockFileModel } from "../../Mocks/MockFileModel";
import { BasenameProperty } from "../../../src/core/Properties/Basename/BasenameProperty";

class Helper{
    static getBasenameProperty():BasenameProperty{
        const mockfile = new MockFileModel("path","/path/to/workproject/this.md",{});
        return new BasenameProperty("title","default",mockfile);
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
    const mockfile = new MockFileModel("/test/","/path/to/workproject/this.md",{});
    let prop = new BasenameProperty("title","default",mockfile);

    test('correct values', () => {
       expect(prop.getValue()).toBe("this");
    });  
}); 
