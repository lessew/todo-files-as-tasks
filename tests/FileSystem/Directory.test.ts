import { Directory } from "../../src/FileSystem/Directory";
import { MockFilesystem } from "../../tests/Mocks/MockFilesystem";
import { MockFilesystemType } from "../../tests/Mocks/MockFilesystemType";
import { MockIOFactory } from "../../tests/Mocks/MockIOFactory";

let tree:MockFilesystemType = {
    directories: {
        "root":["file1.md","file2.md","sub"],
        "root/sub":["file3.md","file4.md","second"],
        "root/sub/second":["file5.md","file6.md"]
    },
    files: {
        "root/file1.md":{
            basename:"file1"
        },
        "root/file2.md":{
            basename:"file2"
        },
        "root/sub/file3.md":{
            basename:"file3"
        },
        "root/sub/file4.md":{
            basename:"file4"
        },
        "root/sub/second/file5.md":{
            basename:"file5"
        },
        "root/sub/second/file6.md":{
            basename:"file6"
        }
    }
}

function getDirectory(path:string):Directory{
    let fs = new MockFilesystem(tree);
    let factory = new MockIOFactory(fs);
    let dir = factory.createDirectory("root",path);
    console.log(dir);
    return dir;
}


describe('Directory getfiles', () => {
    let dir = getDirectory("root");
    let files = dir.getFiles();
    test('Test length of files array ', () => {   
        expect(files.length).toBe(6)
    });
});

describe('Directory getDirectories getFolders', () => {
    let dir = getDirectory("root");
    

    test('Test getDirectories ', () => {   
        let folders = dir.getDirectories();
        expect(folders.length).toBe(2);
        expect("root/sub" in folders).toBe(true);
        expect("root/sub/second" in folders).toBe(true);
    });
});

// test getpathfromroot
describe('Foldermodel getpathfromroot', () => {
    let dir = getDirectory("root/sub/second");

    test('Test ', () => {   
        let path = dir.getPathFromRoot();
        expect(path).toBe("sub/second")
    });
});


