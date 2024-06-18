import { MockFilesystem } from "../../src/Filesystem/mock/MockFilesystem";
import { MockFileTree } from "../../src/Filesystem/mock/MockFileTree";
import { MockIOFactory } from "../../src/Filesystem/mock/MockIOFactory";
import { singleFileTree } from "../../src/Filesystem/mock/MockFileTree";


describe("File constructor", () => {
	let fs: MockFilesystem;
	let io: MockIOFactory;
	let tree: MockFileTree;

	beforeEach(() => {
		tree = singleFileTree("note", "root/path/note.md", { status: "Inbox" });
		fs = new MockFilesystem(tree);
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
