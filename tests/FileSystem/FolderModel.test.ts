import { FolderModel } from "../../src/FileSystem/Directory";
import { MockFileModel } from "../Mocks/MockFile";
import { MockFolderModel } from "../Mocks/MockDirectory";


class Helper{
    static getFolderModel():FolderModel{        
        const root = new MockFolderModel('root','root',
        [
            new MockFileModel('root',"root/file1.md",{}),
            new MockFileModel('root',"root/file2.md",{}),
            new MockFolderModel('root',"root/sub/",
            [
                new MockFileModel('root',"root/sub/file3.md",{}),
                new MockFileModel('root',"root/sub/file4.md",{}),
                new MockFolderModel('root',"root/sub/second/",
                [
                    new MockFileModel('root',"root/sub/second/file5.md",{}),
                    new MockFileModel('root',"root/sub/second/file6.md",{}),
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

// test getpathfromroot
describe('Foldermodel getpathfromroot', () => {
    let fm = new MockFolderModel("root","root/sub/subsub/this.md",[]);

    test('Test ', () => {   
        let path = fm.getPathFromRoot();
        expect(path).toBe("sub/subsub/this.md")
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


// test isFolderModel
describe('Foldermodel isFolderModel', () => {
    let fm = new MockFolderModel("/","/",[]);
    let notfm = new MockFileModel("/","/",{});

    test('Test isfoldermodel: true', () => {   
        expect(FolderModel.isFolderModel(fm)).toBe(true)
    });

    test('Test isfoldermodel: false', () => {   
        expect(FolderModel.isFolderModel(notfm)).toBe(false)
    });

});
