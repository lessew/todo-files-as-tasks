import { FreeTextProperty } from "../../src/core/Properties/FreeTextProperty";
import { PropertyPerstistenceStrategy } from "../../src/core/Interfaces/PropertyPerstistenceStrategy";
import { MockPropertyPerstistenceStrategy } from "../../tests/Mocks/MockPropertyPerstistenceStrategy";

class Helper{
    static getFreeTextProperty(propName:string,propValue:string):FreeTextProperty{
        let dao:PropertyPerstistenceStrategy = new MockPropertyPerstistenceStrategy(propValue);
        let sp = new FreeTextProperty(propName,"dummyfileid",dao,{defaultValue:""});

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
