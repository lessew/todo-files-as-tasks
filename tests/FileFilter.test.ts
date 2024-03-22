 import { FileFilter } from "../src/core/FileFilter";
import { MockFile } from "./Mocks/MockFile";
import { File } from "../src/core/File";
import { WhitelistProperty } from "../src/core/Properties/WhitelistProperty";
import { MockPropertyDAO } from "./Mocks/MockPropertyDAO";


class Helper {
    static getFiles(testerFiles:any[]):File[]{
        let result:File[] = [];
        testerFiles.forEach((obj => {
            let aFile:File = new MockFile(obj.path);
            aFile.properties = {
                "status": new WhitelistProperty("Status-not-used",obj.path,new MockPropertyDAO(obj.status),["Inbox","Done"]),
                "context": new WhitelistProperty("Context-not-used",obj.path,new MockPropertyDAO(obj.context),["Desk","Read"])
            }
            result.push(aFile);
        }));
        return result;
    }
}

const file1:any = {
    path:"path/to/this",
    status:"Inbox",
    context:"Phone"
};
const file2:any = {
    path:"path/to/this",
    status:"InvalidValue",
    context:"Desk"
}
const file3:any = {
    path:"path/to/this",
    status:"Done",
    context:"Desk"
};
const file4:any = {
    path:"path/to/this",
    status:"Inbox",
    context:"Desk"
}

let testerFiles = [file1,file2,file3,file4];

let files = Helper.getFiles(testerFiles)

describe('Filter By (single)', () => {
    let builder = new FileFilter(files);
    test('Test filtering by status (whitelistproperty)', () => {   
        builder.filterBy("status","Inbox");
        expect(builder.files.length).toBe(2);
    });

    builder = new FileFilter(files);
    test('Test filtering by status - file with invalid value as its not part of the whitelist', () => {   
        builder.filterBy("status","InvalidValue");
        expect(builder.files.length).toBe(0);
    });
});


describe('BulkFilterBy', () => {
    let builder = new FileFilter(files);
    test('Test filtering by status (whitelistproperty)', () => {   
        let filters:{propertyName:string,propertyValue:string}[] = [
            {propertyName:"status",propertyValue:"Inbox"},
            {propertyName:"context",propertyValue:"Desk"},

        ]
        builder.bulkFilterBy(filters);
        expect(builder.files.length).toBe(1);
    });
});

