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




