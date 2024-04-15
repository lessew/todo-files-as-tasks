import { FreeTextProperty } from "../../src/core/Properties/FreeTextProperty";
import { PropertyModel } from "../../src/core/Interfaces/PropertyModel";
import { MockPropertyModel } from "../Mocks/MockPropertyModel";

class Helper{
    static getFreeTextProperty(propName:string,propValue:string):FreeTextProperty{
        let dao:PropertyModel = new MockPropertyModel(propValue);
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
