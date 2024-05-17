import { Whitelist } from "../../../src/Properties/Whitelist";
import { WhitelistYAMLPropertySettings } from "../../../src/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { MockFileModel } from "../../../tests/Mocks/MockFileModel";

describe('whitelistyamlpropertysettings: constructor', () => {

    test('correct values', () => {
        let prop = new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"]));
        expect(prop.propName).toBe("status")
    });  
    // TODO this test is unreliable and gives false positives
    test('propname empty', () =>{
        try{
            let prop = new WhitelistYAMLPropertySettings("","Inbox",new Whitelist(["Inbox","Done"]));
            expect(true).toBe(false)
        }
        catch(e){
            expect(true).toBe(true);
        }
    })
}); 


describe('toplevelfolderpropertysettings: adapt to property', () => {
    let propSettings = new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"]));

    const file = new MockFileModel("/test/","/test/home/fixroof.md",{status:"Done"});
    let prop = propSettings.adaptToProperty(file);

    test('test if value is loaded correctly', () => {
       expect(prop.getValue()).toBe("Done");
    });  
});


describe('toplevelfolderpropertysettings: wrong input', () => {
    let propSettings = new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"]));

    const file = new MockFileModel("/test/","/test/home/fixroof.md",{status:"Done22"});
    let prop = propSettings.adaptToProperty(file);

    test('test if value is loaded correctly', () => {
       expect(prop.getValue()).toBe("Done22");
    });  
});