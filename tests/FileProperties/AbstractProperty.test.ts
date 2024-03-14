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
    let sp = Helper.getProperty(name,val);
    
    test('correct property name', () => {
        expect(sp.name).toBe(name);
    });
    test('correct property value', () => {
        expect(sp.value).toBe(val);
    });
    test('change property value', () =>{
        sp.setValidatesTo(true);
        sp.value = "new value";
        expect(sp.value).toBe("new value")
    })
    test('change property value incorrectly', () =>{
        sp.setValidatesTo(false);
        try{
            sp.value = "new value222";
            expect(true).toBe(false);
        }
        catch(e){
            expect(sp.value).toBe("new value")
        }
    })
});