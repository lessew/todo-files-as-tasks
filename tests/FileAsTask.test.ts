import { MockFileModel } from "../tests/Mocks/MockFileModel";
import { WhitelistYAMLProperty } from "../src/core/Properties/WhitelistYAMLProperty";
import { FileModel } from "../src/core/FileModel";
import { Whitelist } from "../src/core/Whitelist";
import { FileAsTask } from "../src/core/FileAsTask";


class Helper{
    static getFileAsTask(path:string):FileAsTask{
        let aFile:FileModel = new MockFileModel(path,{
            status:"Inbox",
            context:"Desk"
        });

        let properties = {
            status: new WhitelistYAMLProperty("status","Inbox",new Whitelist(["Inbox","Done"]), aFile),
            context: new WhitelistYAMLProperty("context","Desk", new Whitelist(["Desk","Read"]),aFile)
        }

        const fileAsTask = new FileAsTask(aFile,properties);
        return fileAsTask;
    }
}

describe('FileAsTask: test', () => {
    let fat = Helper.getFileAsTask("/path/to/file");

    test('getters', () => {    
        expect(fat.get("context")).toBe("Desk");
        expect(fat.get("status")).toBe("Inbox");
    });
    test("setters", async () => {
        await expect(fat.set("context","Read")).resolves.toBe(undefined);
        // TODO fix race condition, make this work async with fat.get(..)
        expect(fat.properties['context'].file.getYAMLProperty("context")).toBe('Read')
        //expect(fat.get("context")).toBe("Read")
    })
    test("setters with invalid value should not change the value",() =>{
        try{
            fat.set("context","error");
            expect(true).toBe(false);
        }
        catch(e){
            expect(fat.get("context")).toBe("Desk")
        }
    })
});


 