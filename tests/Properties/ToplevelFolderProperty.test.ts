import { MockFileModel } from "../Mocks/MockFileModel";
import { ToplevelFolderProperty } from "../../src/core/Properties/ToplevelFolderProperty";

class Helper{
    static getToplevelFolderProperty():ToplevelFolderProperty{
        const mockfile = new MockFileModel();
        return new ToplevelFolderProperty(mockfile);
    }
}


describe('toplevelfolderproperty:getFolderName', () => {
    let prop = Helper.getToplevelFolderProperty();

    test('correct values', () => {
        expect(prop.getFolderName("/path/to/workproject/this.md")).toBe("workproject")
        expect(prop.getFolderName("/path/to/workproject/this")).toBe("workproject")
        expect(prop.getFolderName("this")).toBe(undefined)
        expect(prop.getFolderName("/this")).toBe("")

    });  
}); 

describe('toplevelfolderproperty:getNewFullPathWithTopLevelFolder', () => {
    let prop = Helper.getToplevelFolderProperty();

    test('correct values', () => {
        expect(prop.getNewFullPathWithTopLevelFolder("/path/to/workproject/this.md","newproject"))
        .toBe("/path/to/newproject/this.md")
        expect(prop.getNewFullPathWithTopLevelFolder("/path/to/workproject/.md","newproject"))
        .toBe("/path/to/newproject/.md")
    });  
    test('incorrect values', () =>{
        expect(prop.getNewFullPathWithTopLevelFolder("/path/to/workproject/.md","newproject"))
        .toBe("/path/to/newproject/.md")
    })
}); 

// TODO: include tests for whitelist

