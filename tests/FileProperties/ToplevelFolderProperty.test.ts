import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";
import { MockPropertyDAO } from "../Mocks/MockPropertyDAO";
import { ToplevelFolderProperty } from "../../src/core/Files/Properties/ToplevelFolderProperty";

class Helper{
    static getTopLevelFolderProperty(propName:string,path:string,allowedFolders:string[]):ToplevelFolderProperty{
        let dao:PropertyDAO = new MockPropertyDAO(path);
        let prop = new ToplevelFolderProperty(propName,path,dao); 
        prop.setAllowedProjectValues(allowedFolders)

        return prop;
    }
}

describe('athproperty test validation function', () => {
        let sp = Helper.getTopLevelFolderProperty("/path/to/work/tasks.md","dummy",["home","errands","work"]);

    test('correct values', () => {
       expect(true).toBe(true);

    });  
});
