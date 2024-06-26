import { FileAsTask } from "../../src/FileAsTask/FileAsTask";
import { singleFileTree } from "../../src/FileSystem/Mock/MockFileTree"
import { File } from "../../src/FileSystem/File"
import { MockIOFactory } from "../../src/FileSystem/Mock/MockIOFactory"
import { MockFileSystem } from "../../src/FileSystem/Mock/MockFileSystem"
import { PathPropertyHelper } from "../../src/Properties/PathPropertyHelper";

describe('FileAsTask', () => {
	let file: File;
	let pph: PathPropertyHelper
	beforeEach(() => {
		let fileTree = singleFileTree("note", "path/to/project/note.md", { context: "Read" });
		let fs = new MockFileSystem(fileTree);
		let io = new MockIOFactory(fs);
		file = io.createFile("path/to/project/note.md")
		pph = new PathPropertyHelper(["path/to/project", "path/to/anotherproject"], 0);
	})

	test('constructor and getter', () => {
		let fat = new FileAsTask(file, pph);
		expect(fat.get("context")).toBe("Read");
		expect(fat.get("title")).toBe("note");
		expect(fat.get("project")).toBe("path/to/project")
	});

});






