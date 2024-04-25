 import { FileFilter } from "../src/core/FileFilter";
import {Filter, FilterOperator} from "../src/core/Filter";
import { FileAsTask } from "../src/core/FileAsTask";
import { Whitelist } from "../src/core/Whitelist";
import { MockFileModel } from "./Mocks/MockFileModel";
import { Settings } from "../src/core/Settings";
import { WhitelistYAMLPropertySettings } from "../src/core/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";


class Helper {
    static getFiles(testerFiles:any[]):FileAsTask[]{
        let result: FileAsTask[] = [];
        let settings = new Settings()
            .add(new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])))
            .add(new WhitelistYAMLPropertySettings("context","Desk",new Whitelist(["Phone","Desk"])))

        testerFiles.forEach((afile => {
            let file = new MockFileModel(afile.path,{status:afile.status,context:afile.context});
            let fat = new FileAsTask(file,settings);
            result.push(fat);
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
    //filter.setWhitelist(new Whitelist(["Inbox","Done"]));

    //let propSettings = new PropertySettings("status","default",new Whitelist(["Inbox","Done"]));
    test('Test filtering by status (whitelistproperty)', () => {   
        builder.filterBy(filter);
        expect(builder.files.length).toBe(2);
    });
});

describe('Filter By (single) - invalid status value', () => {
    let builder = new FileFilter(files);
    let filter = new Filter("status","invalid",FilterOperator.include);
    //filter.setWhitelist(new Whitelist(["Inbox","Done"]));

    test('Test filtering by status - file with invalid value as its not part of the whitelist', () => {
        builder.filterBy(filter);
        expect(builder.files.length).toBe(0);
    });
});
 

describe('BulkFilterBy', () => {
    let builder = new FileFilter(files);
    let statusFilter = new Filter("status","Inbox",FilterOperator.include);
    let contextFilter = new Filter("context","Desk",FilterOperator.include);

    test('Test filtering by status (whitelistproperty)', () => {   
        let filters:Filter[] = [statusFilter,contextFilter]
        builder.bulkFilterBy(filters);
        expect(builder.files.length).toBe(1);
    });
});


describe('Filter By not (single)', () => {
    let builder = new FileFilter(files);
    let contextFilter = new Filter("context","Phone",FilterOperator.exclude);
    //contextFilter.setWhitelist(new Whitelist(["Desk","Phone"]))

    test('Test filtering by status (whitelistproperty)', () => {   
        builder.filterBy(contextFilter);
        expect(builder.files.length).toBe(3);
    });
});
