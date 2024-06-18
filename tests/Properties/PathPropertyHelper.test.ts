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
		expect(helper.getDirectory("path/to/something.md")).toBe("path/to/");
	});

	test('getPathWithNewDirectory', () => {

		expect(helper.getPathWithNewDirectory("path/to/workproject/this.md", "path/to/newproject/"))
			.toBe("path/to/newproject/this.md")
		expect(helper.getPathWithNewDirectory("path/to/workproject/.md", "path/to/newproject/"))
			.toBe("path/to/newproject/.md")
		expect(helper.getPathWithNewDirectory("root/home/task.md", "finance/")).toBe("finance/task.md")
		expect(helper.getPathWithNewDirectory("path/to/workproject/.md", "newproject/"))
			.toBe("newproject/.md")
	});
});
	/*
describe('getfullpathfromnewbasename', () => {
	
});
	
	
describe('getbasename', () => {
	
});
describe('getfilename', () => {
	
});
describe('getfullpathfromnewdirectory', () => {
	
});
	
describe('setfolderlist', () => {
	
});
	
describe('getfolder', () => {
	
});
	
describe('validate', () => {
	
});
*/
