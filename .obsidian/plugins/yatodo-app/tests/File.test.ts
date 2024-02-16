import { Context, Status } from "../src/core/FileProperties";
import { MockFile } from "./MockFile";
import { File } from "../src/core/File";


describe("testing abstract file class: pathMatches function",() => {
    const f:File = new MockFile("/home/errands/jumbo.md",{status:Status.next,context:Context.desk});

    test("matches",() => {
        expect(f.pathMatches("/home/errands")).toBe(true);
        expect(f.pathMatches("/home/errands/")).toBe(true);
        expect(f.pathMatches("/home/errands/jum")).toBe(true);
        expect(f.pathMatches("")).toBe(true);
        expect(f.pathMatches("/home/shizznet")).toBe(false);
        expect(f.pathMatches("home/errands")).toBe(false);
    });
});

describe('testing abstract file class', () => {
    const f:File = new MockFile("/home/errands/jumbo.md",{status:Status.next,context:Context.desk});


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
    test('setBasename', () => {
        f.setBasename("shinzet");
        expect(f.getBasenameFromFullPath()).toBe("shinzet");
    });
    test('getYAMLproperties', () => {
        expect(f.getYAMLProperty("status")).toBe(Status.next);
        expect(f.getYAMLProperty("context")).toBe(Context.desk);
    });
    
});

describe('testing edge cases of abstract file class with file with no extension', () => {
    const f:File = new MockFile("/home/errands/jumbo",{status:Status.next,context:Context.desk});


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
    test('setBasename', () => {
        f.setBasename("shinzet");
        expect(f.getBasenameFromFullPath()).toBe("shinzet");
    });
    
});


describe('testing edge cases of abstract file class with file with no extension and no path', () => {
    const f:File = new MockFile("jumbo",{status:Status.next,context:Context.desk});

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