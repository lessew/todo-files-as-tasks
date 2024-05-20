import { PluginSettings } from "src/Configuration/PluginSettings";
import { FileAsTaskModel } from "src/FileSystem/FileAsTaskModel";
import { FileModel } from "src/FileSystem/FileModel";
import { BasenamePropertySettings } from "src/Properties/Basename/BasenamePropertySettings";
import { BooleanYAMLPropertySettings } from "src/Properties/BooleanYAML/BooleanYAMLPropertySettings";
import { BooleanYAMLPropertyView } from "src/Properties/BooleanYAML/BooleanYAMLPropertyView";
import { ToplevelFolderPropertySettings } from "src/Properties/ToplevelFolder/ToplevelFolderPropertySettings";
import { Whitelist } from "src/Properties/Whitelist";
import { WhitelistYAMLPropertySettings } from "src/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";

class DummyFileAsTaskModel extends FileAsTaskModel{
    async createEmptyMarkdownFile(path: string): Promise<void> {
        //throw new Error("Method not implemented.");
    }
    
}

class DummyFileModel extends FileModel{
    move(newPath: string): void | Promise<void> {
        //throw new Error("Method not implemented.");
    }
    getYAMLProperty(name: string): string | null {
        return null;
        //throw new Error("Method not implemented.");
    }
    async setYAMLProperty(name: string, value: string): Promise<void> {
        //throw new Error("Method not implemented.");
    }
    
}

let data:Record<string,string> = {

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
    model.setSettings(settings);
    model.setRoot(rootPath);
    model.setPath(path);
    model.setPluginSettings(settings);
    model.setFileModel(new DummyFileModel());

    test('DUMMY', async () => {
        model.
    //    expect(true).toBe(true);
    });
});
