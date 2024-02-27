import { File } from "../src/core/File";
import { MockFile } from "./mainMockTestApp/MockFile";

describe('testing File class methods', () => {
    const f:File = new MockFile("/home/errands/jumbo.md");

    test("testing File.pathMatches",() => {
        expect(f.pathMatches("/home/errands")).toBe(true);
        expect(f.pathMatches("/home/errands/")).toBe(true);
        expect(f.pathMatches("/home/errands/jum")).toBe(true);
        expect(f.pathMatches("")).toBe(true);
        expect(f.pathMatches("/home/shizznet")).toBe(false);
        expect(f.pathMatches("home/errands")).toBe(false);
    });
    test('File.getFileNameFromFullPath', () => {
        expect(f.getFileNameFromFullPath()).toBe("jumbo.md");
    });
    test('File.getFileExtensionFromFullPath', () => {
        expect(f.getFileExtensionFromFullPath()).toBe(".md");
    });
    test('File.getFolderPathFromFullPath', () => {
        expect(f.getFolderPathFromFullPath()).toBe("/home/errands/");
    });
    test('File.getBasenameFromFullPath', () => {
        expect(f.getBasenameFromFullPath()).toBe("jumbo");
    });
    test('File.isMarkdownFile', () => {
        expect(f.isMarkdownFile()).toBe(true);
    });
});

describe('testing abstract file class: set a new basename', () => {
    test('setBasename with .md file', () => {
        const f:File = new MockFile("/home/errands/jumbo.md");
        f.setBasename("shinzet");
        expect(f.getBasenameFromFullPath()).toBe("shinzet");
    });

    test('setBasename with file with no extension', () => {
        const f:File = new MockFile("/home/errands/jumbo");
        f.setBasename("shinzet");
        expect(f.getBasenameFromFullPath()).toBe("shinzet");
    });
});

describe('testing abstract file class: retrieve yaml properties', () => {
    test('getYAMLproperties valid entries', () => {
        const yaml = {status:"done",context:"desk"}
        const f:MockFile = new MockFile("/home/errands/jumbo.md");
        f.loadYaml(yaml);
        expect(f.getYAMLProperty("status")).toBe("done");
        expect(f.getYAMLProperty("context")).toBe("desk");
    });
});


describe('testing edge cases of abstract file class with file with no extension', () => {
    const f:File = new MockFile("/home/errands/jumbo");

    test('getFileNameFromFullPath', () => {
        expect(f.getFileNameFromFullPath()).toBe("jumbo");
    });
    test('getFileExtensionFromFullPath', () => {
        expect(f.getFileExtensionFromFullPath()).toBe("");
    });
    test('getFolderPathFromFullPath', () => {
        expect(f.getFolderPathFromFullPath()).toBe("/home/errands/");
    });
    test('getBasenameFromFullPath', () => {
        expect(f.getBasenameFromFullPath()).toBe("jumbo");
    });
    test('isMarkdownFile', () => {
        expect(f.isMarkdownFile()).toBe(false);
    });
});


describe('testing edge cases of abstract file class with file with no extension and no path', () => {
    const f:File = new MockFile("jumbo");

    test('getFileNameFromFullPath', () => {
        expect(f.getFileNameFromFullPath()).toBe("jumbo");
    });
    test('getFileExtensionFromFullPath', () => {
        expect(f.getFileExtensionFromFullPath()).toBe("");
    });
    test('getFolderPathFromFullPath', () => {
        expect(f.getFolderPathFromFullPath()).toBe("");
    });
    test('getBasenameFromFullPath', () => {
        expect(f.getBasenameFromFullPath()).toBe("jumbo");
    });
    test('isMarkdownFile', () => {
        expect(f.isMarkdownFile()).toBe(false);
    });
    test('setBasename', () => {
        f.setBasename("shinzet");
        expect(f.getBasenameFromFullPath()).toBe("shinzet");
    });
});


describe('testing calculateNewTopLevelFolderPath', () => {
    const f1:File = new MockFile("/home/errands/jumbo");

    test('calculateNewTopLevelFolderPath valid input', () => {
        expect(f1.calculateNewTopLevelFolderPath("work")).toBe("/home/work/jumbo");
    });
    test('calculateNewTopLevelFolderPath no input', () => {
        expect(f1.calculateNewTopLevelFolderPath("")).toBe("/home/errands/jumbo");
    });

    const f2:File = new MockFile("/home/errands/errands/jumbo");
    test('calculateNewTopLevelFolderPath two folder in path with same name: valid input', () => {
        expect(f2.calculateNewTopLevelFolderPath("work")).toBe("/home/errands/work/jumbo");
    });
    test('calculateNewTopLevelFolderPath two folder in path with same name: no input', () => {
        expect(f2.calculateNewTopLevelFolderPath("")).toBe("/home/errands/errands/jumbo");
    });
});


describe('testing pathMatches', () => {
    const f1:File = new MockFile("/home/errands/jumbo");
    test('match with starting slash', () => {
        expect(f1.pathMatches("/home/errands")).toBe(true);
    });
    test('no match without starting slash', () => {
        expect(f1.pathMatches("home/errands")).toBe(false);
    });
});
