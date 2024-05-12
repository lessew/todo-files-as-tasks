import { MockFileModel } from "../tests/Mocks/MockFileModel";
import { Whitelist } from "../src/core/Whitelist";
import { FileAsTask } from "../src/core/FileAsTask";
import { PluginSettings } from "../src/core/PluginSettings";
import { WhitelistYAMLPropertySettings } from "../src/core/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";



describe('FileAsTask: constructor and getter', () => {
    let file = new MockFileModel("/path","/path",{context:"Read"});
    let settings = new PluginSettings().add(new WhitelistYAMLPropertySettings("context","Desk",new Whitelist(["Read","Desk"])))

    test('constructor and getter', () => {    
        let fat = new FileAsTask(file,settings);
        let context = fat.get("context");
        expect(context).toBe("Read");
    });

});


describe('FileAsTask: setter', () => {
    let file = new MockFileModel("/path","/path",{context:"Read"});
    let settings = new PluginSettings().add(new WhitelistYAMLPropertySettings("context","Desk",new Whitelist(["Read","Desk"])))

    test('constructor and getter', async () => {    
        let fat = new FileAsTask(file,settings);
        await fat.set("context","Desk");
        expect(file.yaml.context).toBe("Desk");
    });

});


describe('FileAsTask: is reserved field', () => {
 
    test('is reserved: expect true',  () => {    
        let reserved1 = FileAsTask.PROJECT_FIELD;
        let reserved2 = FileAsTask.TITLE_FIELD;
        expect(FileAsTask.isReservedField(reserved1)).toBe(true);
        expect (FileAsTask.isReservedField(reserved2)).toBe(true);
    });
    test('is reserved: expect false',  () => { 
        let reserved1 = FileAsTask.PROJECT_FIELD.toUpperCase();;
        let reserved2 = "shizznet";
        expect(FileAsTask.isReservedField(reserved1)).toBe(false);
        expect (FileAsTask.isReservedField(reserved2)).toBe(false);
    });


});


 