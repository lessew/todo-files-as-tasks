import { FolderModel } from "../src/core/Interfaces/FolderModel";
import { MockFileModel } from "./Mocks/MockFileModel";
import { MockFolderModel } from "./Mocks/MockFolderModel";


class Helper{
    static getFolderModel():FolderModel{        
        const file1 = new MockFileModel("root/file1.md",{});
        const file2 = new MockFileModel("root/file2.md",{});
        const file3 = new MockFileModel("root/sub/file3.md",{});
        const file4 = new MockFileModel("root/sub/file4.md",{});
        const folder1 = new MockFolderModel("root/sub/",[file3,file4])
        const folder2 = new MockFolderModel('root/',[file1,file2,folder1])
        let testerFiles = [file1,file2,file3,file4];
        return folder2;
    }
}

describe('Foldermodel getfiles', () => {
    let fm = Helper.getFolderModel();
    let files = fm.getFiles();

    test('Test length of files array ', () => {   
        expect(files.length).toBe(4)
    });
});


// test getFolders
describe('Foldermodel getFolders', () => {
    let fm = Helper.getFolderModel();

    test('Test ', () => {   
        expect(true).toBe(false)
    });
});

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