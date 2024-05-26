import { BasenamePropertySettings } from "../../../src/Properties/Basename/BasenamePropertySettings";
import { MockFileModel } from "../../Mocks/MockFile";

describe('basenamepropertysettings: constructor', () => {

    test('correct values', () => {
        let prop = new BasenamePropertySettings("title");
        expect(prop.propName).toBe("title")

    });  
    test('propname empty', () =>{
        try{
            let prop = new BasenamePropertySettings("");
            expect(true).toBe(false)
        }
        catch(e){
            expect(true).toBe(true);
        }
    })
}); 


describe('basenamepropertysettings: adapt to property', () => {
    let propSettings = new BasenamePropertySettings("title");
    const file = new MockFileModel("/test","/test/to/homeimprovement.md",{});
    let prop = propSettings.adaptToProperty(file);

    test('test if value is loaded correctly', () => {
       expect(prop.getValue()).toBe("homeimprovement");
    });  
  
}); 
