import { MockIOFactory } from "../../src/FileSystem/mock/MockIOFactory";
import { MockFilesystem } from "../../src/FileSystem/mock/MockFilesystem";
import { MockFileTree } from "../../src/FileSystem/mock/MockFileTree";

let tree:MockFileTree= {
    directories: {
        "root/path":["note.md"]
    },
    files: {
        "root/path/note.md":{
            basename:"note",
            yaml:{
                status:"Inbox",
            }
        }
    }
}

describe ("File constructor", () =>{
    let fs = new MockFilesystem(tree);
    let factory = new MockIOFactory(fs);
    test("testing happy constructor with root", () => {
        let file = factory.createFile("root/path/note.md");
        expect(file.fullPath).toBe("root/path/note.md");
        expect(file.getYAMLProperty("status")).toBe("Inbox");
    });

    test("testing constructor fail when incorrect path given", () => {
        try{
                let file = factory.createFile("path/incorrect");
                expect(true).toBe(false)
        }
        catch(e){
            expect(true).toBe(true);
        }
    })
});