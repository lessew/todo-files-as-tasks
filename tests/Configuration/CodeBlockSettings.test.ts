import { CodeBlockSettings } from "../../src/Configuration/CodeBlockSettings";
import { PluginSettings } from "../../src/Configuration/PluginSettings";
import { Filter, FilterOperator } from "../../src/List/Filter";
import { BooleanPropertySettings } from "../../src/Properties/Boolean/BooleanPropertySettings";
import { WhitelistPropertySettings } from "../../src/Properties/Whitelist/WhitelistPropertySettings";

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

const loadFiltersWithProject = `
rootPath: path/to/rootPath/
action: list
project: path/to
`

describe('CodeBlockSettings', () => {
	let cbs: CodeBlockSettings;

	beforeEach(() => {
		cbs = new CodeBlockSettings();
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
		expect(action).toBe(CodeBlockSettings.ACTION_LIST);
	})

	test('parserOperator', () => {
		let [op, needle] = cbs.parseOperator("not Done");
		expect(op).toBe(FilterOperator.exclude);
		expect(needle).toBe("Done")

		let [op2, needle2] = cbs.parseOperator("Done");
		expect(op2).toBe(FilterOperator.include);
		expect(needle2).toBe("Done")

	});

	test('loadFiters happy path', () => {
		cbs.loadSource(loadFilters);
		let settings = new PluginSettings()
			.addYAMLproperty("status", new BooleanPropertySettings(["Inbox", "Done"], "Inbox"))
			.addYAMLproperty("context", new WhitelistPropertySettings(["Desk", "Read"], "Read"))
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
			.addYAMLproperty("status", new WhitelistPropertySettings(["Backlog"], "Backlog"))
		let filters = cbs.parseFilters(settings);
		if (filters instanceof Error) {
			expect(true).toBe(true)
		}
		else {
			expect(false).toBe(true);
		}

	})
});


