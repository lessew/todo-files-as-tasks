import { PropertyPerstistenceStrategy } from "../../src/core/Interfaces/PropertyPerstistenceStrategy";
import { MockPropertyPerstistenceStrategy } from "../Mocks/MockPropertyPerstistenceStrategy";
import { ToplevelFolderProperty } from "../../src/core/Properties/ToplevelFolderProperty";

class Helper{
    static getTopLevelFolderProperty(propName:string,path:string,allowedFolders:string[]):ToplevelFolderProperty{
        let dao:PropertyPerstistenceStrategy = new MockPropertyPerstistenceStrategy(path);
        let prop = new ToplevelFolderProperty(propName,path,dao,{allowedValues:allowedFolders,defaultValue:""}); 
        return prop;
    }
}

describe('athproperty test validation function', () => {
    let prop = Helper.getTopLevelFolderProperty("project","/path/to/work/tasks.md",["home","errands","work"]);

    test('correct values', () => {
       expect(prop.getValue()).toBe("work");
    }); 
    test('test validation function values', () => {
        expect(prop.validate("errands")).toBe(true);
        expect(prop.validate("notgood")).toBe(false);
     });  
     test('changing value', () => {
        prop.setValue("errands");
        expect(prop.getValue()).toBe("errands");
        expect(prop.fileID).toBe("/path/to/errands/tasks.md");
     }); 
});
