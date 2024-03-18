import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";
import { MockPropertyDAO } from "../Mocks/MockPropertyDAO";
import { MockAbstractProperty } from "../Mocks/MockAbstractProperty"


class Helper{
    static getProperty(propName:string,propValue:string):MockAbstractProperty{
        let dao:PropertyDAO = new MockPropertyDAO(propValue);
        let sp = new MockAbstractProperty(propName,"dummyfileid",dao);
        return sp;
    }
}

describe('mockabstractproperty test', () => {
    const name = "title";
    const val = "some random title";
    let prop = Helper.getProperty(name,val);
    
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
    })
});