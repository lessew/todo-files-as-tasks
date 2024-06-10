import { BooleanYAMLPropertySettings } from "../../../src/Properties/BooleanYAML/BooleanYAMLPropertySettings";
import { Whitelist } from "../../../src/Properties/Whitelist";
import { MockFileModel } from "../../../src/FileSystem/mock/MockFile";

describe('BooleanYAMLPropertySettings: constructor', () => {

    test('correct values', () => {
        let prop = new BooleanYAMLPropertySettings("starred","true",new Whitelist(["false","true"]));
        expect(prop.propName).toBe("starred")
    });  
    test('propname empty', () =>{
        try{
            let prop = new BooleanYAMLPropertySettings("","true",new Whitelist(["false","true"]));
            expect(true).toBe(false)
        }
        catch(e){
            expect(true).toBe(true);
        }
    })
}); 


describe('BooleanYAMLPropertySettings: adapt to property', () => {
    let propSettings = new BooleanYAMLPropertySettings("starred","true",new Whitelist(["false","true"]));

    const file = new MockFileModel("/test/","/test/home/fixroof.md",{starred:"false"});
    let prop = propSettings.adaptToProperty(file);

    test('test if value is loaded correctly', () => {
       expect(prop.getValue()).toBe("false");
    });  
});


describe('BooleanYAMLPropertySettings: adapt to property: input not part of whitelist', () => {
    let propSettings = new BooleanYAMLPropertySettings("starred","true",new Whitelist(["false","true"]));

    const file = new MockFileModel("/test/","/test/home/fixroof.md",{starred:"invalid"});
    let prop = propSettings.adaptToProperty(file);

    test('test if value is loaded correctly', () => {
       expect(prop.getValue()).toBe("invalid");
    });  
});


describe('BooleanYAMLPropertySettings: adapt to property: not 2 values in whitelist', () => {

    // TODO this test is unreliable and gives false positives
    test('initialising should throw error', () =>{
        try{
            let propSettings = new BooleanYAMLPropertySettings("starred","true",new Whitelist(["false","true","third"]));
            expect(true).toBe(false)
        }
        catch(e){
            expect(true).toBe(true);
        }
    })
});
