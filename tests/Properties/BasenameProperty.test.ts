import { MockFileModel } from "../../tests/Mocks/MockFile";
import { BaseNameProperty } from "../../src/core/Properties/BasenameProperty";

class Helper{
    static getBasenameProperty():BaseNameProperty{
        const mockfile = new MockFileModel();
        return new BaseNameProperty(mockfile);
    }
}

describe('pathstrategy:getBasename', () => {
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

describe('pathstrategy:getNewFullPathWithBasename', () => {
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