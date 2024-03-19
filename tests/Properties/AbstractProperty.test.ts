import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";
import { MockPropertyDAO } from "../Mocks/MockPropertyDAO";
import { MockAbstractProperty } from "../Mocks/MockAbstractProperty"


class Helper{
    static getMockAbstractProperty(propName:string,propValue:string):MockAbstractProperty{
        let dao:PropertyDAO = new MockPropertyDAO(propValue);
        let sp = new MockAbstractProperty(propName,"dummyfileid",dao);
        return sp;
    }
    
    static getPropertyWithNonExistingDAO():MockAbstractProperty{
        let dao:MockPropertyDAO = new MockPropertyDAO("-");
        dao.setPropertyNameToNotExist();
        let prop = new MockAbstractProperty("dummy","dummyfileid",dao);
        return prop;
    }
}

describe('mockabstractproperty test', () => {
    const name = "title";
    const val = "some random title";
    let prop = Helper.getMockAbstractProperty(name,val);
    
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

    let prop = Helper.getMockAbstractProperty(propName,propValue);
    test('should be empty', () => {
        expect(prop.isEmptyValue()).toBe(true);
    })
    const propName2 = "context";
    const propValue2 = "next";
    let prop2 = Helper.getMockAbstractProperty(propName2,propValue2);
    test('should not be empty', () => {
        expect(prop2.isEmptyValue()).toBe(false);
    })
    
    prop = Helper.getPropertyWithNonExistingDAO();
    test('should  be empty', () => {
        expect(prop.isEmptyValue()).toBe(true);
    })
    
});
