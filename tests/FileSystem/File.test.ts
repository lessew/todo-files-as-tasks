import { MockFileSystem } from "../../src/FileSystem/Mock/MockFilesystem";
import { MockFileTree } from "../../src/FileSystem/Mock/MockFileTree";
import { MockIOFactory } from "../../src/FileSystem/Mock/MockIOFactory";
import { singleFileTree } from "../../src/FileSystem/Mock/MockFileTree";


describe("File constructor", () => {
	let fs: MockFileSystem;
	let io: MockIOFactory;
	let tree: MockFileTree;

	beforeEach(() => {
		tree = singleFileTree("note", "root/path/note.md", { status: "Inbox" });
		fs = new MockFileSystem(tree);
		io = new MockIOFactory(fs);
	});

	test("testing happy constructor with root", () => {
		let file = io.createFile("root/path/note.md");
		expect(file.fullPath).toBe("root/path/note.md");
		expect(file.getYAMLProperty("status")).toBe("Inbox");
	});

	test("testing constructor fail when incorrect path given", () => {
		try {
			let file = io.createFile("path/incorrect");
			expect(true).toBe(false)
		}
		catch (e) {
			expect(true).toBe(true);
		}
	})
});
