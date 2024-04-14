import { PathStrategy } from "../../../src/core/PropertyStrategies/PathStrategy";

class MockPathStrategy extends PathStrategy{
    getValue(path: string): string {
        return path;
    }
}

class Helper{
    static getPathStrategy():PathStrategy{
        return new MockPathStrategy();
    }
}


describe('pathstrategy:validate', () => {
    let ps = Helper.getPathStrategy();

    test('correct values', () => {
        expect(ps.validate("/this/that/such/that/thing.md")).toBe(true);
        expect(ps.validate("./")).toBe(true);
        expect(ps.validate("/this/")).toBe(true); 

    });  
    test('incorrect values', () =>{
        expect(ps.validate("")).toBe(false);
        expect(ps.validate("/this!")).toBe(false);
        expect(ps.validate("/t   his")).toBe(false);

    })
}); 

describe('pathstrategy:getBasename', () => {
    let ps = Helper.getPathStrategy();

    test('correct values', () => {
       expect(ps.getBasename("/path/to/workproject/this.md")).toBe("this")
       expect(ps.getBasename("/path/to/workproject/this")).toBe("this")
       expect(ps.getBasename("this")).toBe("this")
       expect(ps.getBasename("/this")).toBe("this")


    });  
    test('incorrect values', () =>{
        expect(ps.getBasename("")).toBe("")
        expect(ps.getBasename(".")).toBe("")
        expect(ps.getBasename("/")).toBe("")
    })
}); 


describe('pathstrategy:getNewFullPathWithBasename', () => {
    let ps = Helper.getPathStrategy();

    test('correct values', () => {
        expect(ps.getNewFullPathWithBasename("/path/to/workproject/this.md","that"))
        .toBe("/path/to/workproject/that.md");
        expect(ps.getNewFullPathWithBasename("/path/to/workproject/this","that"))
        .toBe("/path/to/workproject/that")
        expect(ps.getNewFullPathWithBasename("this","that"))
        .toBe("that")
    });  
    test('incorrect values', () =>{
        
    })
}); 

describe('pathstrategy:getFolderName', () => {
    let ps = Helper.getPathStrategy();

    test('correct values', () => {
        expect(ps.getFolderName("/path/to/workproject/this.md")).toBe("workproject")
        expect(ps.getFolderName("/path/to/workproject/this")).toBe("workproject")
        expect(ps.getFolderName("this")).toBe(undefined)
        expect(ps.getFolderName("/this")).toBe("")

    });  
}); 

describe('pathstrategy:getNewFullPathWithTopLevelFolder', () => {
    let ps = Helper.getPathStrategy();

    test('correct values', () => {
        expect(ps.getNewFullPathWithTopLevelFolder("/path/to/workproject/this.md","newproject"))
        .toBe("/path/to/newproject/this.md")
        expect(ps.getNewFullPathWithTopLevelFolder("/path/to/workproject/.md","newproject"))
        .toBe("/path/to/newproject/.md")
    });  
    test('incorrect values', () =>{
        expect(ps.getNewFullPathWithTopLevelFolder("/path/to/workproject/.md","newproject"))
        .toBe("/path/to/newproject/.md")
    })
}); 



