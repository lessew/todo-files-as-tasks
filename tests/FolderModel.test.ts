import { FolderModel } from "../src/core/FolderModel";
import { MockFolderModel } from "./Mocks/MockFolderModel";

class Helper{
    static getFolderModel():FolderModel{
        let fm = new MockFolderModel();
        return fm;
    }
}

describe('Foldermodel test', () => {
    let fm = Helper.getFolderModel();

    test('Test ', () => {   
        expect(true).toBe(false)
    });
});

// test getFilesAsTasks
describe('Foldermodel test', () => {
    let fm = Helper.getFolderModel();

    test('Test ', () => {   
        expect(true).toBe(false)
    });
});

// test getFolders
describe('Foldermodel getFolders', () => {
    let fm = Helper.getFolderModel();

    test('Test ', () => {   
        expect(true).toBe(false)
    });
});

// test getFoldersAsWhitelist

describe('Foldermodel getFoldersAsWhitelist', () => {
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