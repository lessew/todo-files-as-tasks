import { FolderModel } from "../src/core/Interfaces/FolderModel";
import { MockFileModel } from "./Mocks/MockFileModel";
import { MockFolderModel } from "./Mocks/MockFolderModel";


class Helper{
    static getFolderModel():FolderModel{        
        const root = new MockFolderModel('root/',
        [
            new MockFileModel("root/file1.md",{}),
            new MockFileModel("root/file2.md",{}),
            new MockFolderModel("root/sub/",
            [
                new MockFileModel("root/sub/file3.md",{}),
                new MockFileModel("root/sub/file4.md",{}),
                new MockFolderModel("root/sub/second/",
                [
                    new MockFileModel("root/sub/second/file5.md",{}),
                    new MockFileModel("root/sub/second/file6.md",{}),
                ])
            ])
        ])
      
        return root;
    }
}

describe('Foldermodel getfiles', () => {
    let fm = Helper.getFolderModel();
    let files = fm.getFiles();

    test('Test length of files array ', () => {   
        expect(files.length).toBe(6)
    });
});


// test getFolders
describe('Foldermodel getFolders', () => {
    let fm = Helper.getFolderModel();

    test('Test ', () => {   
        let folders = fm.getFolders();
        expect(folders.length).toBe(2)
    });
});


// test getFolders
describe('Foldermodel getFolderPaths', () => {
    let fm = Helper.getFolderModel();

    test('Test ', () => {   
        let folders = fm.getFolderPaths();
        expect(folders.includes("sub/second/")).toBe(true)
        expect(folders.includes("sub/")).toBe(true)
    });
});

/*
// test getFoldersAsArray

describe('Foldermodel getFoldersAsArray', () => {
    let fm = Helper.getFolderModel();

    test('Test ', () => {   
        expect(true).toBe(false)
    });
});

// test isFolderModel

describe('Foldermodel isFolderModel', () => {
    let fm = Helper.getFolderModel();

    test('Test ', () => {   
        expect(true).toBe(false)
    });
});
*/