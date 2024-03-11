import { PathProperty } from "../../src/core/Files/FileProperties/PathProperty";
import { File } from "../../src/core/Files/File";
import { MockFileSystemFacade } from "./MockFileSystemFacade";
import { FileSystemFacade } from "../../src/core/Files/FileSystemFacade";
import { PathPropertyDAO } from "src/core/Files/FilePropertyDAOs/PathPropertyDAO";
import { MockFilePropertyDAO } from "./MockFilePropertyDAO";

class Helper {
    static getPathProperty(p:string):PathProperty{
        let fsf:FileSystemFacade = new MockFileSystemFacade();
        let f = new File(p,fsf);
        let prop = new PathProperty("PathProperty");
        let dao:PathPropertyDAO = new MockFilePropertyDAO(f,prop,fsf);
        prop.setDAO(dao);
        prop.value = p;
        return prop;
    }
}


describe('pathproperty; methods', () => {
    const pp = Helper.getPathProperty("/home/errands/jumbo.md");

    test("matches",() => {
        expect(pp.matches("/home/errands")).toBe(true);
        expect(pp.matches("/home/errands/")).toBe(true);
        expect(pp.matches("/home/errands/jum")).toBe(true);
        expect(pp.matches("")).toBe(true);
        expect(pp.matches("/home/shizznet")).toBe(false);
        expect(pp.matches("home/errands")).toBe(false);
    });
    test('filename', () => {
        expect(pp.filename).toBe("jumbo.md");
    });
    test('fileExtension', () => {
        expect(pp.fileExtension).toBe(".md");
    });
    test('folderpath', () => {
        expect(pp.folderPath).toBe("/home/errands/");
    });
    test('basename', () => {
        expect(pp.basename).toBe("jumbo");
    });
    test('ismarkdownfile', () => {
        expect(pp.isMarkdownFile()).toBe(true);
    });
});

describe('pathproperty edge case: filename without extension', () => {
    const pp = Helper.getPathProperty("/home/errands/jumbo");

    test('getFileNameFromFullPath', () => {
        expect(pp.filename).toBe("jumbo");
    });
    test('getFileExtensionFromFullPath', () => {
        expect(pp.fileExtension).toBe("");
    });
    test('getFolderPathFromFullPath', () => {
        expect(pp.folderPath).toBe("/home/errands/");
    });
    test('getBasenameFromFullPath', () => {
        expect(pp.basename).toBe("jumbo");
    });
    test('isMarkdownFile', () => {
        expect(pp.isMarkdownFile()).toBe(false);
    });
});


describe('pathproperty edge case: filename without extension and no path', () => {
    const pp = Helper.getPathProperty("jumbo");

    test('getFileNameFromFullPath', () => {
        expect(pp.filename).toBe("jumbo");
    });
    test('getFileExtensionFromFullPath', () => {
        expect(pp.fileExtension).toBe("");
    });
    test('getFolderPathFromFullPath', () => {
        expect(pp.folderPath).toBe("");
    });
    test('getBasenameFromFullPath', () => {
        expect(pp.basename).toBe("jumbo");
    });
    test('isMarkdownFile', () => {
        expect(pp.isMarkdownFile()).toBe(false);
    });
});


describe('testing calculateNewTopLevelFolderPath', () => {
    const pp = Helper.getPathProperty("/home/errands/jumbo");

    test('calculateNewTopLevelFolderPath valid input', () => {
        expect(pp.getNewFullPathWithTopLevelFolder("work")).toBe("/home/work/jumbo");
    });
    test('calculateNewTopLevelFolderPath no input', () => {
        expect(pp.getNewFullPathWithTopLevelFolder("")).toBe("/home/errands/jumbo");
    });

    const pp2 = Helper.getPathProperty("/home/errands/errands/jumbo");

    test('calculateNewTopLevelFolderPath two folder in path with same name: valid input', () => {
        expect(pp2.getNewFullPathWithTopLevelFolder("work")).toBe("/home/errands/work/jumbo");
    });
    test('calculateNewTopLevelFolderPath two folder in path with same name: no input', () => {
        expect(pp2.getNewFullPathWithTopLevelFolder("")).toBe("/home/errands/errands/jumbo");
    });
});


describe('testing matches edge case with starting and without starting slash', () => {
    const pp = Helper.getPathProperty("/home/errands/jumbo");

    test('match with starting slash', () => {
        expect(pp.matches("/home/errands")).toBe(true);
    });
    test('no match without starting slash', () => {
        expect(pp.matches("home/errands")).toBe(false);
    });
});