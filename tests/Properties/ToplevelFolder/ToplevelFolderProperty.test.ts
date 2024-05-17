import { ToplevelFolderProperty } from "../../../src/Properties/ToplevelFolder/ToplevelFolderProperty";
import { Whitelist } from "../../../src/Properties/Whitelist";
import { MockFileModel } from "../../Mocks/MockFileModel";

class Helper{
    static getToplevelFolderProperty():ToplevelFolderProperty{
        let wl = new Whitelist(["this","that"]);
        const mockfile = new MockFileModel("","path",{});
        return new ToplevelFolderProperty("no-value",wl,mockfile);
    }
}


describe('toplevelfolderproperty:getFolderPath', () => {
    let prop = Helper.getToplevelFolderProperty();

    test('correct values', () => {
        expect(prop.getFolderPath("path","path/to/workproject/this.md")).toBe("to/workproject")
        expect(prop.getFolderPath("path","path/to/workproject/this")).toBe("to/workproject")
        expect(prop.getFolderPath("","this")).toBe("./")
        expect(prop.getFolderPath("","/this")).toBe("./")
    });  
}); 

describe('toplevelfolderproperty:getNewFullPathWithTopLevelFolder', () => {
    let prop = Helper.getToplevelFolderProperty();
    test('correct values', () => {
        expect(prop.getNewFullPathWithTopLevelFolder("path","path/to/workproject/this.md","to/newproject"))
        .toBe("path/to/newproject/this.md")
        expect(prop.getNewFullPathWithTopLevelFolder("path","path/to/workproject/.md","to/newproject"))
        .toBe("path/to/newproject/.md")
        expect(prop.getNewFullPathWithTopLevelFolder("root","root/home/task.md","finance")).toBe("root/finance/task.md")
    });  
    test('incorrect values', () =>{
        expect(prop.getNewFullPathWithTopLevelFolder("path","path/to/workproject/.md","newproject"))
        .toBe("path/newproject/.md")
    })
}); 


describe('toplevelfolderproperty:setValue', () => {
    let wl = new Whitelist(["home","work","home/finance"]);
    const mockfile = new MockFileModel("root","root/home/task.md",{});
    let prop = new ToplevelFolderProperty("home",wl,mockfile);

    test('setvalue to correct path', () => {
        prop.setValue("home/finance");
        expect(mockfile.path).toBe("root/home/finance/task.md")
    });  
}); 

describe('toplevelfolderproperty:setValue edge case', () => {
    let wl = new Whitelist(["home","work","finance","finance/taxes","finance/taxes/IRS Hotline"]);
    const mockfile = new MockFileModel("root","root/finance/taxes/IRS Hotline/task.md",{});
    let prop = new ToplevelFolderProperty("home",wl,mockfile);

    test('setvalue to correct path', () => {
        prop.setValue("finance");
        expect(mockfile.path).toBe("root/finance/task.md")
    });  
}); 