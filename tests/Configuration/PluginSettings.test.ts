import { PluginSettings } from "../../src/Configuration/PluginSettings";
import { WhitelistPropertySettings } from "../../src/Properties/Whitelist/WhitelistPropertySettings";
import { Whitelist } from "../../src/Properties/Whitelist";

describe('Settings: create object)', () => {
	let settings: PluginSettings;

	beforeEach(() => {
		settings = new PluginSettings()
			.addYAMLproperty("status", new WhitelistPropertySettings(["Inbox", "Done"], "Inbox"))
			.addYAMLproperty("context", new WhitelistPropertySettings(["Read", "Desk"], "Desk"));
	});

	test('Test load', () => {
		settings = new PluginSettings();
		settings.load({
			properties: [{
				name: "status",
				type: "whitelist",
				whitelist: ["Inbox", "Done"],
				defaultValue: "Inbox"
			},
			{
				name: "flagged",
				type: "boolean",
				whitelist: ["yes", "no"],
				defaultValue: "no"
			}]
		})

		expect(settings.propertySettings.get("status")!.getType()).toBe("whitelist")
		expect(settings.propertySettings.get("status")!.validate("Done")).toBe(true);
		expect(settings.propertySettings.get("status")!.validate("---Done")).toBe(false);

	});

	test("load: incorrect values: no input", () => {
		settings = new PluginSettings();
		let fromData;
		let result = settings.load(fromData);
		expect(result instanceof Error).toBe((true));

		fromData = null;
		result = settings.load(fromData);
		expect(result instanceof Error).toBe((true));

	});
	test("load: incorrect values: empty input", () => {
		settings = new PluginSettings();
		let result = settings.load({});
		expect(result instanceof Error).toBe((true));
	});

	test("load: incorrect values: empty properties input", () => {
		settings = new PluginSettings();
		let result = settings.load({
			properties: {}
		});
		expect(result instanceof Error).toBe(true);

	});
	test("load: incorrect values: one incorrect properties instance input", () => {
		settings = new PluginSettings();
		let result = settings.load({
			properties: [
				{
					type: "this"
				}
			]
		})
		expect(result instanceof Error).toBe((true));
	});

	test("load: default values", () => {
		settings = new PluginSettings();
		let result = settings.loadDefaultSettings();
		expect(result instanceof Error).toBe((false));
	});


	test('Test save', () => {
		let savedData = settings.save();
		try {
			let savedParsedData = savedData as {
				properties: {
					name: string,
					type: string,
					defaultValue: string,
					whitelist?: string[]
				}[]
			};

		}
		catch (e) {
			expect(true).toBe(false);
		}
	});
});

