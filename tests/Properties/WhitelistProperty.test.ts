import { WhitelistProperty } from "../../src/core/Properties/WhitelistProperty";
import { PropertyDAO } from "../../src/core/Interfaces/PropertyDAO";
import { MockPropertyDAO } from "../Mocks/MockPropertyDAO";


class Helper{
    static getWhitelistProperty(propName:string,propValue:string,options:string[]):WhitelistProperty{
        let dao:PropertyDAO = new MockPropertyDAO(propValue);
        let sp = new WhitelistProperty(propName,"dummyfileid",dao,options);
        return sp;
    }
}

describe('whitelistproperty test: validate function', () => {
    const sp = Helper.getWhitelistProperty("context","next",["next","waiting for"]);
    test('testing validate function with correct input', () => {
        expect(sp.validate("next")).toBe(true);
    })
    test('testing validate function with correct input', () => {
        expect(sp.validate("waiting for")).toBe(true);
    })
    test('testing validate function with incorrect input', () => {
        expect(sp.validate("next222")).toBe(false);
    })
});


describe('whitelistproperty isValidValue is set correctly', () => {
    const prop = Helper.getWhitelistProperty("context","next",["next","waiting for"]);
    prop.initializeValue();

    test('testing validate function with correct input', () => {
        expect(prop.loadedValueIsValid()).toBe(true);
    })

    const prop2 = Helper.getWhitelistProperty("context","invalid",["next","waiting for"]);
    prop2.initializeValue();

    test('testing validate function with correct input', () => {
        expect(prop2.loadedValueIsValid()).toBe(false);
    })

});