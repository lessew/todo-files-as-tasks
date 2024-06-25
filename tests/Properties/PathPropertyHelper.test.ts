import { PathPropertyHelper } from "../../src/Properties/PathPropertyHelper";

describe('PathPropertyHelper', () => {
	let helper: PathPropertyHelper;

	beforeEach(() => {
		helper = new PathPropertyHelper(["home", "home/finance"], 0);
	})

	test('getFileName', () => {
		expect(helper.getFilename("path/to/filename.md")).toBe("filename.md");
	});

	test('getDirectory', () => {
		expect(helper.getDirectory("path/to/something.md")).toBe("path/to");
	});

	test('getPathWithNewDirectory', () => {
		expect(helper.getPathWithNewDirectory("path/to/workproject/this.md", "path/to/newproject"))
			.toBe("path/to/newproject/this.md")
		expect(helper.getPathWithNewDirectory("path/to/workproject/.md", "path/to/newproject"))
			.toBe("path/to/newproject/.md")
		expect(helper.getPathWithNewDirectory("root/home/task.md", "finance")).toBe("finance/task.md")
		expect(helper.getPathWithNewDirectory("path/to/workproject/.md", "newproject"))
			.toBe("newproject/.md")
	});

	test("getPathWithNewBase", () => {
		expect(helper.getBasename("path/to/workproject/this.md")).toBe("this")
		expect(helper.getBasename("path/to/workproject/this")).toBe("this")
		expect(helper.getBasename("this")).toBe("this")
		expect(helper.getBasename("this")).toBe("this")
		expect(helper.getBasename("")).toBe("")
		expect(helper.getBasename(".")).toBe("")
		expect(helper.getBasename("/")).toBe("")
	});

	test("isValidDirectory", () => {
		expect(helper.isValidDirectory("home")).toBe(true);
		expect(helper.isValidDirectory("home/finance")).toBe(true);
		expect(helper.isValidDirectory("home/")).toBe(false);
		expect(helper.isValidDirectory("some/random/shizzley/home")).toBe(false);
	})

	test("isValidFilename", () => {
		expect(helper.isValidFilename("filename.txt")).toBe(true);
		expect(helper.isValidFilename("#")).toBe(false);
		expect(helper.isValidFilename("this_that_shizzle-shozzle")).toBe(true);
	})

	test("isValidPath", () => {
		expect(helper.isValidPath("home/this.md")).toBe(true);
		expect(helper.isValidPath("home/finance/that.md")).toBe(true);
		expect(helper.isValidPath("/this.md")).toBe(false);
		expect(helper.isValidPath("home/finance/notexistingfolder/that.md")).toBe(false);
	})
});
