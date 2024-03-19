import { FreeTextProperty } from "../../src/core/Properties/FreeTextProperty";
import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";
import { MockPropertyDAO } from "../../tests/Mocks/MockPropertyDAO";

class Helper{
    static getFreeTextProperty(propName:string,propValue:string):FreeTextProperty{
        let dao:PropertyDAO = new MockPropertyDAO(propValue);
        let sp = new FreeTextProperty(propName,"dummyfileid",dao);

        return sp;
    }
}

describe('stringproperty test', () => {
    const name = "title";
    const val = "some random title";
    let sp = Helper.getFreeTextProperty(name,val);

    test('correct value', () => {
        expect(sp.validate("correct")).toBe(true);
    });  
}); 
