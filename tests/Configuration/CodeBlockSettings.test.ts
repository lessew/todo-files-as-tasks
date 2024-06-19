import { PluginSettings } from "../../src/Configuration/PluginSettings";
import { Filter, FilterOperator } from "../../src/FileAsTask/Filter";
import { BooleanPropertySettings } from "../../src/Properties/Boolean/BooleanPropertySettings";
import { Whitelist } from "../../src/Properties/Whitelist";
import { WhitelistPropertySettings } from "../../src/Properties/Whitelist/WhitelistPropertySettings";
import { YAMLParser } from "../../src/Configuration/YAMLParser";

const loadSourceCorrect = `
rootPath: .
action: list`;

const loadSourceIncorrect = `
rootPath: .
actionlist`;

const loadRootPath = `
rootPath: path/to/rootPath/`;

const loadRootPathIncorrect = `
`

const loadAction = `
rootPath: path/to/rootPath/
action: list`;

const loadFilters = `
rootPath: path/to/rootPath/
action: list
status: Done
context: not Desk`;

const loadFiltersUnhappy = `
rootPath: path/to/rootPath/
action: list
status: Done`;

describe('CodeBlockSettings', () => {
	let cbs: YAMLParser;

	beforeEach(() => {
		cbs = new YAMLParser();
	});

	test('loadSource happy path', () => {
		let result = cbs.loadSource(loadSourceCorrect);
		expect(result).toBe(true);
	});

	test('loadSource unhappy path', () => {
		let result = cbs.loadSource(loadSourceIncorrect);
		expect(result instanceof Error).toBe(true);
	});

	test('loadRootPath happy path', () => {
		cbs.loadSource(loadRootPath);
		let rp = cbs.parseRootPath();
		expect(rp).toBe("path/to/rootPath/");
	})

	test('loadRootPath unhappy path', () => {
		cbs.loadSource(loadRootPathIncorrect);
		let rp = cbs.parseRootPath();
		expect(rp instanceof Error).toBe(true);
	})

	test('loadAction happy path', () => {
		cbs.loadSource(loadAction);
		let action = cbs.parseAction();
		expect(action).toBe(YAMLParser.ACTION_LIST);
	})

	test('loadFiters happy path', () => {
		cbs.loadSource(loadFilters);
		let settings = new PluginSettings()
			.addYAMLproperty("status", new BooleanPropertySettings(new Whitelist(["Inbox", "Done"]), "Inbox"))
			.addYAMLproperty("context", new WhitelistPropertySettings(new Whitelist(["Desk", "Read"]), "Read"))
		let filters = cbs.parseFilters(settings);
		if (filters instanceof Error) {
			expect(true).toBe(false);
		}
		else {
			let f1: Filter = filters[0];
			let f2: Filter = filters[1];
			expect(f1.operator).toBe(FilterOperator.include);
			expect(f1.propertyName).toBe("status")
			expect(f1.propertyValue).toBe("Done")
			expect(f2.operator).toBe(FilterOperator.exclude);
			expect(f2.propertyName).toBe("context")
			expect(f2.propertyValue).toBe("Desk")
		}
	})
	test('loadFilters unhappy path', () => {
		cbs.loadSource(loadFiltersUnhappy);
		let settings = new PluginSettings()
			.addYAMLproperty("status", new WhitelistPropertySettings(new Whitelist(["Backlog"]), "Backlog"))
		let filters = cbs.parseFilters(settings);
		if (filters instanceof Error) {
			expect(true).toBe(true)
		}
		else {
			expect(false).toBe(true);
		}

	})
});


