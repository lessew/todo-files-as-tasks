 import { FileFilter } from "../src/core/FileFilter";
import { MockFile } from "./Mocks/MockFile";
import { File } from "../src/core/File";
import { WhitelistProperty } from "../src/core/Properties/WhitelistProperty";
import { MockPropertyModel } from "./Mocks/MockPropertyModel";
import {Filter, FilterOperator} from "../src/core/Interfaces/Filter";


class Helper {
    static getFiles(testerFiles:any[]):File[]{
        let result:File[] = [];
        testerFiles.forEach((obj => {
            let aFile:File = new MockFile(obj.path);
            aFile.properties = {
                "status": new WhitelistProperty("status",
                    obj.path,
                    new MockPropertyModel(obj.status),
                    {allowedValues:["Inbox","Done"],defaultValue:""}),
                "context": new WhitelistProperty("context",
                    obj.path,
                    new MockPropertyModel(obj.context),
                    {allowedValues:["Desk","Phone"], defaultValue:""})
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
        builder.filterBy({
            propertyName:"status",
            propertyValue:"Inbox",
            operator:FilterOperator.include
        });
        expect(builder.files.length).toBe(2);
    });

    builder = new FileFilter(files);
    test('Test filtering by status - file with invalid value as its not part of the whitelist', () => {   
        builder.filterBy({
            propertyName:"status",
            propertyValue:"InvalidStatus",
            operator:FilterOperator.include
        });
        expect(builder.files.length).toBe(0);
    });
});


describe('BulkFilterBy', () => {
    let builder = new FileFilter(files);
    test('Test filtering by status (whitelistproperty)', () => {   
        let filters:Filter[] = [
            {
                propertyName:"status",
                propertyValue:"Inbox",
                operator:FilterOperator.include
            },
            {
                propertyName:"context",
                propertyValue:"Desk",
                operator:FilterOperator.exclude
            },
        ]
        builder.bulkFilterBy(filters);
        expect(builder.files.length).toBe(1);
    });
});


describe('Filter By not (single)', () => {
    let builder = new FileFilter(files);
    test('Test filtering by status (whitelistproperty)', () => {   
        builder.filterBy({
            propertyName:"context",
            propertyValue:"Phone",
            operator:FilterOperator.exclude
        });
        expect(builder.files.length).toBe(3);
    });
});