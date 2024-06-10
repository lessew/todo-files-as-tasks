import { Directory } from "../../src/FileSystem/Directory";
import { MockFilesystem } from "../../src/FileSystem/mock/MockFilesystem";
import { MockFileTree } from "../../src/FileSystem/mock/MockFileTree";
import { MockIOFactory } from "../../src/FileSystem/mock/MockIOFactory";

let tree: MockFileTree= {
    directories: {
        "root":["root/file1.md","root/file2.md","root/sub"],
        "root/sub":["root/sub/file3.md","root/sub/file4.md","root/sub/second"],
        "root/sub/second":["root/sub/second/file5.md","root/sub/second/file6.md"]
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

describe ("Directory constructor", () =>{
    let fs = new MockFilesystem(tree);
    let factory = new MockIOFactory(fs);
    test("testing happy constructor with root", () => {

        let dir = factory.createDirectory("root");
        expect(dir.fullPath).toBe("root");
        expect(dir.children.length).toBe(3);
    });

    test("testing happy constructor with subfolder", () => {
        let dir = factory.createDirectory("root/sub");
        expect(dir.fullPath).toBe("root/sub");
        expect(dir.children.length).toBe(3);
    });
    

    test("testing constructor with invalid input", () =>{
        let tryWithInvalidInput = (path:string) => {
            try{
                factory.createDirectory(path);
                expect(true).toBe(false);
            }
            catch(e){
                expect(true).toBe(true);
            }
        }
        tryWithInvalidInput("");
        tryWithInvalidInput(".");
        tryWithInvalidInput("/");
        tryWithInvalidInput("directorydoesnotexists");

    });
});

describe('Directory getfiles', () => {
    let fs = new MockFilesystem(tree);
    let factory = new MockIOFactory(fs);

    test('Test length of files array ', () => {
        let dir = factory.createDirectory("root");
        let files = dir.getFiles();
        expect(files.length).toBe(6)
    });
    test('Test length of files array ', () => {
        let dir = factory.createDirectory("root/sub");
        let files = dir.getFiles();
        expect(files.length).toBe(4)
    });
});


describe('Directory getDirectories getFolders', () => {
    let fs = new MockFilesystem(tree);
    let factory = new MockIOFactory(fs);

    test('Test getDirectories ', () => {   
        let dir = factory.createDirectory("root");
        let dirs = dir.getDirectories();
        let dirmap = dirs.map(dir => dir.fullPath);
        expect(dirs.length).toBe(3);
        expect(dirmap.includes("root")).toBe(true);
        expect(dirmap.includes("root/sub")).toBe(true);
        expect(dirmap.includes("root/sub/second")).toBe(true);
    });
});

