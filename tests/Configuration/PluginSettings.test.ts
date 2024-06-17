import { MockIOFactory } from "../../src/FileSystem/mock/MockIOFactory";
import { PluginSettings } from "../../src/Configuration/PluginSettings";
import { Whitelist } from "../../src/FileAsTask/PropertyStrategies/Whitelist";
import { WhitelistYAMLPropertySettings } from "../../src/FileAsTask/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { singleFileTree } from "../../src/FileSystem/mock/MockFileTree";
import { MockFilesystem } from "../../src/FileSystem/mock/MockFilesystem";
import { File } from "../../src/FileSystem/File";


describe('Settings: create object)', () => {
    let settings:PluginSettings;
    let file:File; 

    beforeEach(() => {
        let tree = singleFileTree("file","path/to/file.md",{status:"Done",context:"Desk"})
        let factory = new MockIOFactory(new MockFilesystem((tree)));
        file = factory.createFile("path/to/file.md");
        settings = new PluginSettings()
            .add(new WhitelistYAMLPropertySettings("status", "Inbox", new Whitelist(["Inbox", "Done"])))
            .add(new WhitelistYAMLPropertySettings("context", "Read", new Whitelist(["Read", "Desk"])));
    });

    test('Test get properties', () => {   
      let properties = settings.getProperties(file);
        expect(properties["status"].getValue()).toBe("Done");
        expect(properties["context"].getValue()).toBe("Desk");
    });
});

