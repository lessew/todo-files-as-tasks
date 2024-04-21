 import { FileFilter } from "../src/core/FileFilter";
import {Filter, FilterOperator} from "../src/core/Filter";
import { FileAsTask } from "../src/core/FileAsTask";
import { MockFileAsTask } from "./Mocks/MockFileAsTask";
import { PropertySettings } from "../src/core/Property";
import { Whitelist } from "../src/core/Whitelist";


class Helper {
    static getFiles(testerFiles:any[]):FileAsTask[]{
        let result: FileAsTask[] = [];
        testerFiles.forEach((afile => {
            let mockfat = new MockFileAsTask({
                status: afile.status,
                context:afile.context
            })
            result.push(mockfat);

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
    let filter = new Filter("status","Inbox",FilterOperator.include);
    filter.setWhitelist(new Whitelist(["Inbox","Done"]));

    //let propSettings = new PropertySettings("status","default",new Whitelist(["Inbox","Done"]));
    test('Test filtering by status (whitelistproperty)', () => {   
        builder.filterBy(filter);
        expect(builder.files.length).toBe(2);
    });
});

describe('Filter By (single) - invalid status value', () => {
    let builder = new FileFilter(files);
    let filter = new Filter("status","invalid",FilterOperator.include);
    filter.setWhitelist(new Whitelist(["Inbox","Done"]));

    test('Test filtering by status - file with invalid value as its not part of the whitelist', () => {
        builder.filterBy(filter);
        expect(builder.files.length).toBe(0);
    });
});
 

describe('BulkFilterBy', () => {
    let builder = new FileFilter(files);
    let statusFilter = new Filter("status","Inbox",FilterOperator.include);
    statusFilter.setWhitelist(new Whitelist(["Inbox","Done"]));
    let contextFilter = new Filter("context","Desk",FilterOperator.include);
    contextFilter.setWhitelist(new Whitelist(["Desk","Phone"]));

    test('Test filtering by status (whitelistproperty)', () => {   
        let filters:Filter[] = [statusFilter,contextFilter]
        builder.bulkFilterBy(filters);
        expect(builder.files.length).toBe(1);
    });
});


describe('Filter By not (single)', () => {
    let builder = new FileFilter(files);
    let contextFilter = new Filter("context","Phone",FilterOperator.exclude);
    contextFilter.setWhitelist(new Whitelist(["Desk","Phone"]))

    test('Test filtering by status (whitelistproperty)', () => {   
        builder.filterBy(contextFilter);
        expect(builder.files.length).toBe(3);
    });
});
