import { PluginSettings } from "../../src/Configuration/PluginSettings";
import { FileAsTaskModel } from "../../src/FileSystem/FileAsTaskModel";
import { FileModel } from "../../src/FileSystem/File";
import { BasenamePropertySettings } from "../../src/Properties/Basename/BasenamePropertySettings";
import { BooleanYAMLPropertySettings } from "../../src/Properties/BooleanYAML/BooleanYAMLPropertySettings";
import { ToplevelFolderPropertySettings } from "../../src/Properties/ToplevelFolder/ToplevelFolderPropertySettings";
import { Whitelist } from "../../src/Properties/Whitelist";
import { WhitelistYAMLPropertySettings } from "../../src/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { MockFileModel } from "../../tests/Mocks/MockFileModel";

class DummyFileAsTaskModel extends FileAsTaskModel{
    async createEmptyMarkdownFile(path: string): Promise<void> {
        //throw new Error("Method not implemented.");
    }
    
}

let data:Record<string,string> = {
    starred:"true",
    status:"Done"
}

let settings = new PluginSettings()
    .add(new BasenamePropertySettings("title"))
    .add(new ToplevelFolderPropertySettings("project"))
    .add(new BooleanYAMLPropertySettings("starred","true",new Whitelist(["true","false"])))
    .add(new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])))

let rootPath = "/";
let path = "finance/newtasktocreate.md";

describe('Create file as task, write to disk', () => {
    let model = new DummyFileAsTaskModel();
    model.setData(data);
    model.setRoot(rootPath);
    model.setPath(path);
    model.setPluginSettings(settings);
    model.setFileModel(new MockFileModel(rootPath,path,{}));
   

    test('DUMMY', () => {
        model.persistYAMLProperties();
        expect(model.fileModel.getYAMLProperty("starred")).toBe("true")
        expect(model.fileModel.getYAMLProperty("status")).toBe("Done")
    });
});
