import { MockFolderModel } from "./Mocks/MockFolderModel";
import { FolderModel } from "../src/core/FolderModel";
import { MockFileModel } from "./Mocks/MockFileModel";
import { FileAsTaskCollection } from "../src/core/FileAsTaskCollection";
import { PropertySettings, Settings } from "../src/core/Settings";
import { Whitelist } from "../src/core/Whitelist";


const file1 = new MockFileModel("path/to/this",{
    path:"path/to/this",
    status:"Inbox",
    context:"Phone"
});
const file2 = new MockFileModel("path/to/this",{
    path:"path/to/this",
    status:"InvalidValue",
    context:"Desk"
});
const file3 = new MockFileModel("path/to/this",{
    path:"path/to/this",
    status:"Done",
    context:"Desk"
});
const file4 = new MockFileModel("path/to/this",{
    status:"Inbox",
    context:"Desk"
});

let testerFiles = [file1,file2,file3,file4];

class Helper{
    static getRootFolder():FolderModel{
        let fm = new MockFolderModel("path/to/this",testerFiles);
        return fm;
    }
}

describe('FileAsTaskCollection: create object)', () => {
    let rootFolder = Helper.getRootFolder();
    let settings:Settings = {
        "status":new PropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])),
        "context":new PropertySettings("context","Desk",new Whitelist(["Desk","Phone"]))
    }

    let fatc = new FileAsTaskCollection(rootFolder,settings);

    test('Test rootfolder exists and has children', () => {   
        expect(fatc.getRootFolder().children.length).toBe(4);
    });

    test('Test correct number of filesastasks', () => {   
        expect(fatc.get().length).toBe(4);
    });
});

/*
describe('FileAsTaskCollection: filter)', () => {
    let rootFolder = Helper.getRootFolder();
    let settings:Settings = {
        "status":new PropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])),
        "context":new PropertySettings("context","Desk",new Whitelist(["Desk","Phone"]))
    }
    let fatc = new FileAsTaskCollection(rootFolder,settings);
    let filter = new Filter("status","Done",FilterOperator.include);


    //let propSettings = new PropertySettings("status","default",new Whitelist(["Inbox","Done"]));
    test('Test filter (single)', () => {   
        fatc.filter(filter);
        const r = fatc.get();
        expect(r.length).toBe(1);
        //expect(fatc.filter(f).children.length).toBe(4);
    });
});
*/