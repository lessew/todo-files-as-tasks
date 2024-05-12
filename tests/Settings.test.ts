import { Whitelist } from "../src/core/Whitelist";
import { BasenamePropertySettings } from "../src/core/Properties/Basename/BasenamePropertySettings";
import { PluginSettings } from "../src/core/PluginSettings";
import { WhitelistYAMLPropertySettings } from "../src/core/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { MockFileModel } from "./Mocks/MockFileModel";

describe('Settings: create object)', () => {
    let settings = new PluginSettings();
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

describe('Settings: get properties', () => {
    let settings = new PluginSettings()
    .add(new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])))
    .add(new WhitelistYAMLPropertySettings("context","Read",new Whitelist(["Read","Desk"])));

    let file = new MockFileModel("path","/path/to/file",{status:"Done",context:"Desk"});

    test('Test get properties', () => {   
      let properties = settings.getProperties(file);
        expect(properties["status"].getValue()).toBe("Done");
        expect(properties["context"].getValue()).toBe("Desk");
    });
});

