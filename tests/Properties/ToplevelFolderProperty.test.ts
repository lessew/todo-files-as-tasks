import { PropertyModel } from "../../src/core/Interfaces/PropertyModel";
import { MockPropertyModel } from "../Mocks/MockPropertyModel";
import { ToplevelFolderProperty } from "../../src/core/Properties/ToplevelFolderProperty";

class Helper{
    static getTopLevelFolderProperty(propName:string,path:string,allowedFolders:string[]):ToplevelFolderProperty{
        let dao:PropertyModel = new MockPropertyModel(path);
        let prop = new ToplevelFolderProperty(propName,path,dao,{allowedValues:allowedFolders,defaultValue:""}); 
        return prop;
    }
}

describe('athproperty test validation function',  () => {
    let prop = Helper.getTopLevelFolderProperty("project","/path/to/work/tasks.md",["home","errands","work"]);

    test('correct values', () => {
       expect(prop.getValue()).toBe("work");
    }); 
    test('test validation function values', () => {
        expect(prop.validate("errands")).toBe(true);
        expect(prop.validate("notgood")).toBe(false);
     });  
     test('changing value', async () => {
        await prop.setValue("errands");
        expect(prop.getValue()).toBe("errands");
        expect(prop.fileID).toBe("/path/to/errands/tasks.md");
     }); 
});
