import { PluginSettings, SavedSettingsDataType } from "../../src/Configuration/PluginSettings";
import { Configuration } from "../../src/Configuration/Configuration";


let yamlString: string = `
rootPath: Todo
action: list
    `;


describe('Configuration test', () => {
	let testConfig: SavedSettingsDataType;
	let folders: string[];

	beforeEach(() => {
		testConfig = {
			properties: [
				{
					name: "status",
					defaultValue: "Next",
					whitelist: ["Inbox", "Next"],
					type: "whitelist"
				}]
		};
		folders = ['groceries', 'groceries/appie', 'work'];
	});


	test('Test happy path', () => {

		let c = new Configuration();
		let s = new PluginSettings().load(testConfig);
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
		c.loadPathPropertyHelper(folders);
		expect(c.stateIsError()).toBe(false);
		let settings = c.getSettings();
		expect(settings.getPropertySetting("status").getType()).toBe("whitelist");
	});
});
