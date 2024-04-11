import { MockProperty } from "../Mocks/MockProperty";
import { PropertyPerstistenceStrategy } from "../../src/core/Interfaces/PropertyPerstistenceStrategy";
import { MockPropertyPerstistenceStrategy } from "../Mocks/MockPropertyPerstistenceStrategy";
import { PropertySettings } from "src/core/PropertySettings";


class Helper{
    static getMockProperty(propName:string,propValue:string):MockProperty{
        let dao:PropertyPerstistenceStrategy = new MockPropertyPerstistenceStrategy(propValue);
        let sp = new MockProperty(propName,"dummyfileid",dao, {defaultValue:""} as PropertySettings);
        return sp;
    }
    
    static getPropertyWithNonExistingDAO():MockProperty{
        let dao:MockPropertyPerstistenceStrategy = new MockPropertyPerstistenceStrategy("-");
        dao.setPropertyNameToNotExist();
        let prop = new MockProperty("dummy","dummyfileid",dao,{defaultValue:""} as PropertySettings);
        return prop;
    }
}

describe('mockabstractproperty test', () => {
    const name = "title";
    const val = "some random title";
    let prop = Helper.getMockProperty(name,val);
    
    test('correct property name', () => {
        expect(prop.name).toBe(name);
    });
    test('correct property value', () => {
        expect(prop.getValue()).toBe(val);
    });
    test('change property value', () =>{
        prop.setValidatesTo(true);
        prop.setValue("new value");
        expect(prop.getValue()).toBe("new value")
    })
    test('change property value incorrectly', () =>{
        prop.setValidatesTo(false);
        try{
            prop.setValue("new value222");
            expect(true).toBe(false);
        }
        catch(e){
            expect(prop.getValue()).toBe("new value")
        }
    });
});

describe('mockabstractproperty check isempty method', () => {
    let propName = "context";
    let propValue = "";

    let prop = Helper.getMockProperty(propName,propValue);
    test('should be empty', () => {
        expect(prop.isEmptyValue()).toBe(true);
    })
    const propName2 = "context";
    const propValue2 = "next";
    let prop2 = Helper.getMockProperty(propName2,propValue2);
    test('should not be empty', () => {
        expect(prop2.isEmptyValue()).toBe(false);
    })
    
    prop = Helper.getPropertyWithNonExistingDAO();
    test('should  be empty', () => {
        expect(prop.isEmptyValue()).toBe(true);
    })
    
});
