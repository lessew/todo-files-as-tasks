import { WhitelistYAMLProperty } from "../../../src/core/Properties/WhitelistYAML/WhitelistYAMLProperty";
import { Whitelist } from "../../../src/core/Properties/Whitelist";
import { MockFileModel } from "../../Mocks/MockFileModel";


class Helper{
    static getWhitelistProperty(contextValue:string,options:string[]):WhitelistYAMLProperty{
        let wl = new Whitelist(options);
        let file = new MockFileModel("/path","/path",{context:contextValue});
        let sp = new WhitelistYAMLProperty("context",options[0],wl,file);
        return sp;
    }
}

describe('whitelistproperty test: getValue() function', () => {
    const sp = Helper.getWhitelistProperty("next",["next","waiting for"]);
    test('testing getValue', () => {
        expect(sp.getValue()).toBe("next");
    })
});

describe('whitelistproperty test: getValue() function with incorrect input to revert to default', () => {
    const sp = Helper.getWhitelistProperty("invalid",["next","waiting for"]);
    test('testing getValue', () => {
        expect(sp.getValue()).toBe("invalid");
    })
});



describe('whitelistproperty test: validate function', () => {
    const sp = Helper.getWhitelistProperty("next",["next","waiting for"]);
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
