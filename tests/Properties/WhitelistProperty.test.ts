import { WhitelistProperty } from "../../src/core/Properties/WhitelistProperty";
import { PropertyModel } from "../../src/core/Interfaces/PropertyModel";
import { MockPropertyModel } from "../Mocks/MockPropertyModel";


class Helper{
    static getWhitelistProperty(propName:string,propValue:string,options:string[]):WhitelistProperty{
        let dao:PropertyModel = new MockPropertyModel(propValue);
        let sp = new WhitelistProperty(propName,"dummyfileid",dao,{allowedValues:options,defaultValue:""});
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