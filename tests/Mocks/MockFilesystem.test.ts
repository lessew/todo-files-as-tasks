import { MockFilesystem } from "./MockFilesystem";
import { MockFilesystemType } from "./MockFilesystemType";

describe('MockFilesystem test', () => {
    let data:MockFilesystemType = {
        directories : {
            "root":["root/this","root/that","root/noyamlprop.md","root/hasyamlprop.md"],
            "root/this":[],
            "root/that":[]
        },
        files: {
            "root/noyamlprop.md": {
                basename: "another"
            },
            "root/hasyamlprop.md": {
                basename: "this",
                yaml: {
                    aprop:"value"
                }
            }
        }
    }
    let mfs = new MockFilesystem(data);    

    test('pathIsDirectory ', () => {   
        expect(mfs.pathIsDirectory("root/noyamlprop.md")).toBe(false);
        expect(mfs.pathIsDirectory("root")).toBe(true);
        expect(mfs.pathIsDirectory("false")).toBe(false);
        expect(mfs.pathIsDirectory("/")).toBe(false);
        expect(mfs.pathIsDirectory("root/this")).toBe(true);
    });
    test("pathIsFile", () => {
        expect(mfs.pathIsFile(""))
        expect(mfs.pathIsFile("root/hasyamlprop.md")).toBe(true);
        expect(mfs.pathIsFile("root")).toBe(false);
        expect(mfs.pathIsFile("./")).toBe(false);
    });
    test("getYAMLProperty", () => {
        expect(mfs.getYAMLProperty("root/hasyamlprop.md","aprop")).toBe("value");
        expect(mfs.getYAMLProperty("root/hasyalmprop.md","prop-not-exist-in-yaml")).toBe("");
        expect(mfs.getYAMLProperty("root/noyamlprop.md","prop")).toBe("");
        expect(mfs.getYAMLProperty("file/not/exist","prop")).toBe("");
    })
    test("setYAMLProperty on file that already has a yamlprop", async () => {
        await mfs.setYAMLProperty("root/hasyamlprop.md","newprop","newvalue");
        expect(mfs.getYAMLProperty("root/hasyamlprop.md","newprop")).toBe("newvalue");
        expect(mfs.tree.files["root/hasyamlprop.md"].yaml!.newprop).toBe("newvalue");
    })
    test("setYAMLProperty on file that does not yet have a yamlprop", async () => {
        await mfs.setYAMLProperty("root/noyamlprop.md","newprop","newvalue");
        expect(mfs.getYAMLProperty("root/noyamlprop.md","newprop")).toBe("newvalue");
        expect(mfs.tree.files["root/noyamlprop.md"].yaml!.newprop).toBe("newvalue");
    })
    test("Readdir", () => {
        let actual = mfs.readDir("root");
        expect(actual.length).toBe(4);
        expect(actual[0]).toBe("root/this");
    });
    test("Readdir non existing dir", () => {
        let nodir = mfs.readDir("");
        expect(nodir.length).toBe(0);
    });
});