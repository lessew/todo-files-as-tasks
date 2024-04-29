import { MockFileModel } from "../tests/Mocks/MockFileModel";
import { Whitelist } from "../src/core/Whitelist";
import { FileAsTask } from "../src/core/FileAsTask";
import { Settings } from "../src/core/Settings";
import { WhitelistYAMLPropertySettings } from "../src/core/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";



describe('FileAsTask: constructor and getter', () => {
    let file = new MockFileModel("/path","/path",{context:"Read"});
    let settings = new Settings().add(new WhitelistYAMLPropertySettings("context","Desk",new Whitelist(["Read","Desk"])))

    test('constructor and getter', () => {    
        let fat = new FileAsTask(file,settings);
        let context = fat.get("context");
        expect(context).toBe("Read");
    });

});


describe('FileAsTask: setter', () => {
    let file = new MockFileModel("/path","/path",{context:"Read"});
    let settings = new Settings().add(new WhitelistYAMLPropertySettings("context","Desk",new Whitelist(["Read","Desk"])))

    test('constructor and getter', async () => {    
        let fat = new FileAsTask(file,settings);
        await fat.set("context","Desk");
        expect(file.yaml.context).toBe("Desk");
    });

});



 