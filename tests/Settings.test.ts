import { BasenamePropertySettings } from "../src/core/Properties/Basename/BasenamePropertySettings";
import { Settings } from "../src/core/Settings";

describe('Settings: create object)', () => {
    let settings = new Settings();
    test('Test addBasename', () => {   
        settings.add(new BasenamePropertySettings("title"));
        expect(settings.get("title").propName).toBe("title");
    });
    // TODO this test is unreliable and gives false positives
    test("Testing getting non existent", () =>{
        try{
            let impossible = settings.get("does-not-exist");
            expect(true).toBe(false)
        }
        catch(e){
            expect(true).toBe(true);
        }
    });
});
