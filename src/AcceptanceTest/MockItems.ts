import { PluginSettings } from "src/Configuration/PluginSettings";

/**
 * Make sure thise files exists in the vault
 */
const expectedFiles = [
	{
		path: "todo-home/Finance/Finalize finance weekend NYC.md",
		root: "todo-home",
		title: "Finalize finance weekend NYC",
		project: "todo-home/Finance",
		yaml: { context: "Deep", status: "Waiting", starred: "✰" }
	},
	{
		path: "todo-home/Finance/Pay holiday bill.md",
		root: "todo-home",
		title: "Pay holiday bill",
		project: "todo-home/Finance",
		yaml: { status: "Done", context: "Deep", starred: "⭐" }
	},
	{
		path: "todo-home/Finance/Taxes 2023/Get income statement work.md",
		root: "todo-home",
		title: "Get income statement work",
		project: "todo-home/Finance/Taxes 2023",
		yaml: { context: "None", status: "Deferred", starred: "⭐" }
	},
	{
		path: "todo-home/Finance/Taxes 2023/Get mortgage details 2024.md",
		root: "todo-home",
		title: "Get mortgage details 2024",
		project: "todo-home/Finance/Taxes 2023",
		yaml: { context: "None", status: "Waiting", starred: "⭐" }
	},
	{
		path: "todo-home/Finance/Taxes 2023/IRS Hotline/Ask details re taxes 2023.md",
		root: "todo-home",
		title: "Ask details re taxes 2023",
		project: "todo-home/Finance/Taxes 2023/IRS Hotline",
		yaml: { context: "None", status: "Waiting", starred: "⭐" }
	},
	{
		path: "todo-home/Groceries/Bread.md",
		root: "todo-home",
		title: "Bread",
		project: "todo-home/Groceries",
		yaml: { context: "None", status: "Inbox", starred: "✰" }
	},
	{
		path: "todo-home/Groceries/Peppers.md",
		root: "todo-home",
		title: "Peppers",
		project: "todo-home/Groceries",
		yaml: { context: "", status: "", starred: "" }
	}
];

const ROOT = "todo-home";

const expectedFolders = [
	"todo-home",
	"todo-home/Finance",
	"todo-home/Finance/Taxes 2023",
	"todo-home/Finance/Taxes 2023/IRS Hotline",
	"todo-home/Kids",
	"todo-home/Groceries"
]

const yaml = `
rootPath: ${ROOT}
action: list`;


export function getRoot(): string {
	return ROOT;
}

export function getSettings(): PluginSettings {
	let s = new PluginSettings();
	s.loadDefaultSettings();
	return s;
}
export function getYamlListAllFiles(): string {
	return yaml;
}

export type ExpectedFileType = { path: string, root: string, title: string, project: string, yaml: { context?: string, status?: string, starred?: string } };

export function getExpectedFiles(): ExpectedFileType[] {
	return expectedFiles;
}

export function getExpectedHolidayBillFile(): ExpectedFileType {
	return expectedFiles[1];
}

export function getExpectedFolders(): string[] {
	return expectedFolders;
}
