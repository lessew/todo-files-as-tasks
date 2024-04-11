import { PropertyPerstistenceStrategy } from "../../src/core/Interfaces/PropertyPerstistenceStrategy";
import { MockPropertyPerstistenceStrategy } from "../../tests/Mocks/MockPropertyPerstistenceStrategy";
import { BasenameProperty } from "../../src/core/Properties/BasenameProperty";

class Helper{
    static getBasenameProperty(propName:string,path:string):BasenameProperty{
        let dao:PropertyPerstistenceStrategy = new MockPropertyPerstistenceStrategy(path);
        let prop = new BasenameProperty(propName,path,dao,{defaultValue:""}); 
        return prop;
    }
}

describe('basenameproperty test getter function', () => {
    let prop = Helper.getBasenameProperty("title","/path/to/folder/dummy.md");

    test('correct values', () => {
        expect(prop.getValue()).toBe("dummy");
    });  
}); 


describe('basenameproperty test setter function', () => {
    let prop = Helper.getBasenameProperty("title","/path/to/folder/dummy.md");
    prop.setValue("newdummy");

    test('correct values', () => {
        expect(prop.getValue()).toBe("newdummy");
        expect(prop.fileID).toBe("/path/to/folder/newdummy.md")
        expect(prop.getFolderPath()).toBe("/path/to/folder/");
        expect(prop.getFileExtension()).toBe(".md");
    });  
}); 

