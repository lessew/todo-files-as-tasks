import { SettingsModel, SettingsSavedFormatType } from "../src/core/SettingsModel";
import { Configuration } from "../src/core/Configuration";
import { YAMLParser } from "../src/core/YAMLParser";


describe('Configuration test', () => {
    let yamlString:string =`
rootPath: Todo
    `;

    let testConfig:SettingsSavedFormatType = {
        properties: [{
        propName:"title",
        defaultValue:"default",
        type:"basename"
    },
    {
        propName:"status",
        defaultValue:"Next",
        whitelist:["Inbox","Next"],
        type:"whitelistYAML"
    } ]
    };
    let folders = ['groceries','groceries/appie','work'];

    test('Test happy path', () => {   
        let p = new YAMLParser();
        let s = SettingsModel.loadDeepCopy(testConfig);
        let c = new Configuration();
        c.loadSource(yamlString);
        expect(c.stateIsError()).toBe(false);
        c.loadRootPath();
        expect(c.stateIsError()).toBe(false);
        c.loadSettings(testConfig); 
        expect(c.stateIsError()).toBe(false);
        c.loadFolders(folders);
        expect(c.stateIsError()).toBe(false);

    });
});