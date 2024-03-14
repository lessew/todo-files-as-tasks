import { StringProperty } from "../../src/core/Files/Properties/StringProperty";
import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";
import { MockPropertyDAO } from "../../tests/Mocks/MockPropertyDAO";

class Helper{
    static getStringProperty(propName:string,propValue:string):StringProperty{
        let dao:PropertyDAO = new MockPropertyDAO(propValue);
        let sp = new StringProperty(propName,"dummyfileid",dao);

        return sp;
    }
}

describe('stringproperty test', () => {
    const name = "title";
    const val = "some random title";
    let sp = Helper.getStringProperty(name,val);

    test('correct value', () => {
        expect(sp.validate("correct")).toBe(true);
    });  
}); 
