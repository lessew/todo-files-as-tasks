import { Configuration } from "../../src/Configuration/Configuration";
import { SettingsSavedFormatType, SettingsModel } from "../../src/Configuration/SettingsModel";


describe('Configuration test', () => {
    let yamlString:string =`
rootPath: Todo
action: list
    `;

    let testConfig:SettingsSavedFormatType = {
        properties: [
            {
                propName: "title",
                defaultValue: "default",
                type: "basename"
            },
            {
                propName: "project",
                defaultValue: "",
                type: "toplevelfolder"
            },
            {
                propName: "status",
                defaultValue: "Next",
                whitelist: ["Inbox", "Next"],
                type: "whitelistYAML"
            }]
    };
    let folders = ['groceries','groceries/appie','work'];

    test('Test happy path', () => {   
/* TODO setup tests with beforeeach and aftereach
        beforeEach(() => {
            //          testEmail = 'test@example.com';
        });

        // delete the test email address after each test
        afterEach(() => {
            //            testEmail = null;
        });
*/

        let c = new Configuration();
        let s = SettingsModel.loadDeepCopy(testConfig);
        c.loadSource(yamlString);
        expect(c.stateIsError()).toBe(false);
        c.loadSettings(s);
        expect(c.stateIsError()).toBe(false);
        c.loadRootPath();
        expect(c.stateIsError()).toBe(false);
        expect(c.getRootPath()).toBe("Todo");
        c.loadAction();
        expect(c.stateIsError()).toBe(false);
        expect(c.getAction()).toBe("list");
        c.loadDirectories(folders);
        expect(c.stateIsError()).toBe(false);
        let settings = c.getSettings();
        expect(settings.get("title").propName).toBe("title");
        expect(settings.get("project").propName).toBe("project");
        expect(settings.get("status").propName).toBe("status");
    });
});