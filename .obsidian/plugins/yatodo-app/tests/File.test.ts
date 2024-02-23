import { TestMockFile } from "./mainMockTestApp/TestMockFile";
import { File } from "../src/core/File";
import { mockStatusIdValues,mockContextIdValues } from "./mockData/mockFileProperties";


describe("testing abstract file class: pathMatches function",() => {
    const f:File = new TestMockFile("/home/errands/jumbo.md");

    test("matches",() => {
        expect(f.pathMatches("/home/errands")).toBe(true);
        expect(f.pathMatches("/home/errands/")).toBe(true);
        expect(f.pathMatches("/home/errands/jum")).toBe(true);
        expect(f.pathMatches("")).toBe(true);
        expect(f.pathMatches("/home/shizznet")).toBe(false);
        expect(f.pathMatches("home/errands")).toBe(false);
    });
});

describe('testing abstract file class: derived functions from rootpath', () => {
    const f:File = new TestMockFile("/home/errands/jumbo.md");

    test('getFileNameFromFullPath', () => {
        expect(f.getFileNameFromFullPath()).toBe("jumbo.md");
    });
    test('getFileExtensionFromFullPath', () => {
        expect(f.getFileExtensionFromFullPath()).toBe(".md");
    });
    test('getFolderPathFromFullPath', () => {
        expect(f.getFolderPathFromFullPath()).toBe("/home/errands/");
    });
    test('getBasenameFromFullPath', () => {
        expect(f.getBasenameFromFullPath()).toBe("jumbo");
    });
    test('isMarkdownFile', () => {
        expect(f.isMarkdownFile()).toBe(true);
    });
});

describe('testing abstract file class: set a new basename', () => {
    test('setBasename with .md file', () => {
        const f:File = new TestMockFile("/home/errands/jumbo.md");
        f.setBasename("shinzet");
        expect(f.getBasenameFromFullPath()).toBe("shinzet");
    });

    test('setBasename with file with no extension', () => {
        const f:File = new TestMockFile("/home/errands/jumbo");
        f.setBasename("shinzet");
        expect(f.getBasenameFromFullPath()).toBe("shinzet");
    });
});

describe('testing abstract file class: retrieve yaml properties', () => {
  
    test('getYAMLproperties valid entries', () => {
        const yaml = {status:mockStatusIdValues.done,context:mockContextIdValues.desk}
        const f:TestMockFile = new TestMockFile("/home/errands/jumbo.md");
        f.loadYaml(yaml);
        expect(f.getYAMLProperty("status")).toBe(mockStatusIdValues.done);
        expect(f.getYAMLProperty("context")).toBe(mockContextIdValues.desk);
    });

});


describe('testing edge cases of abstract file class with file with no extension', () => {
    const f:File = new TestMockFile("/home/errands/jumbo");

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
    const f:File = new TestMockFile("jumbo");

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
    const f1:File = new TestMockFile("/home/errands/jumbo");
    const f2:File = new TestMockFile("/home/errands/errands/jumbo");

    test('calculateNewTopLevelFolderPath valid input', () => {
        expect(f1.calculateNewTopLevelFolderPath("work")).toBe("/home/work/jumbo");
    });
    test('calculateNewTopLevelFolderPath no input', () => {
        expect(f1.calculateNewTopLevelFolderPath("")).toBe("/home/errands/jumbo");
    });

    test('calculateNewTopLevelFolderPath two folder in path with same name: valid input', () => {
        expect(f2.calculateNewTopLevelFolderPath("work")).toBe("/home/errands/work/jumbo");
    });
    test('calculateNewTopLevelFolderPath two folder in path with same name: no input', () => {
        expect(f2.calculateNewTopLevelFolderPath("")).toBe("/home/errands/errands/jumbo");
    });

});