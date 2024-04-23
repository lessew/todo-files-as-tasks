import { MockFileModel } from "../../../tests/Mocks/MockFileModel";
import { Whitelist } from "../../../src/core/Whitelist";
import { BooleanYAMLPropertySettings } from "../../../src/core/Properties/BooleanYAML/BooleanYAMLPropertySettings";

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

    const file = new MockFileModel("/test/home/fixroof.md",{starred:"false"});
    let prop = propSettings.adaptToProperty(file);

    test('test if value is loaded correctly', () => {
       expect(prop.getValue()).toBe("false");
    });  
});


describe('BooleanYAMLPropertySettings: adapt to property: wrong input', () => {
    let propSettings = new BooleanYAMLPropertySettings("starred","true",new Whitelist(["false","true"]));

    const file = new MockFileModel("/test/home/fixroof.md",{starred:"invalid"});
    let prop = propSettings.adaptToProperty(file);

    test('test if value is loaded correctly', () => {
       expect(prop.getValue()).toBe("true");
    });  
});
