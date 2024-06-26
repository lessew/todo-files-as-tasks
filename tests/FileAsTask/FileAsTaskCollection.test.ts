import { FileAsTaskCollection } from "../../src/FileAsTask/FileAsTaskCollection";
import { Directory } from "src/Filesystem/Directory";
import { MockFileSystem } from "src/Filesystem/mock/MockFilesystem";
import { MockFileTree } from "../../src/Filesystem/mock/MockFileTree";
import { MockIOFactory } from "src/Filesystem/mock/MockIOFactory";
import { PathPropertyHelper } from "../../src/Properties/PathPropertyHelper";
import { PluginSettings } from "../../src/Configuration/PluginSettings";
import { Filter, FilterOperator } from "../../src/FileAsTask/Filter";
import { Whitelist } from "../../src/Properties/Whitelist";
import { FileAsTask } from "../../src/FileAsTask/FileAsTask"
import { DummyFile } from "../../src/Filesystem/mock/Dummy";

type MockFileAsTaskType = {
	status: string,
	context: string
}


class MockFileAsTask extends FileAsTask {
	private data: MockFileAsTaskType;

	constructor(mock: MockFileAsTaskType) {
		super(new DummyFile(), new PathPropertyHelper([], 0));
		this.data = mock;
	}

	override get(propName: string): string {
		let p = propName as "status" | "context";
		return this.data[p];
	}
}


describe('FileAsTaskCollection', () => {
	let collection: FileAsTaskCollection;

	beforeEach(() => {
		let files = [
			new MockFileAsTask({
				status: "Inbox",
				context: "Desk"
			}),
			new MockFileAsTask({
				status: "Inbox",
				context: "Read"
			}),
			new MockFileAsTask({
				status: "Done",
				context: "Desk"
			})
		];
		collection = new FileAsTaskCollection(files);
	});


	test('Test number of tasks', () => {
		expect(collection.get().length).toBe(3);
	});

	test('Filter include', () => {
		let f = new Filter("status", "Inbox", FilterOperator.include);
		expect(collection.filterBy(f).get().length).toBe(2);
	})
	test('Filter exclude', () => {
		let f = new Filter("status", "Inbox", FilterOperator.exclude);
		expect(collection.filterBy(f).get().length).toBe(1);
	})

	test('Bulkfilter', () => {
		let f1 = new Filter("status", "Inbox", FilterOperator.include);
		let f2 = new Filter("context", "Desk", FilterOperator.include);
		expect(collection.bulkFilterBy([f1, f2]).get().length).toBe(1);
	})
});

