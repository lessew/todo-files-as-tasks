import { MockFolderModel } from "./Mocks/MockFolderModel";
import { MockFileModel } from "./Mocks/MockFileModel";
import { FileAsTaskCollection } from "../src/core/FileAsTaskCollection";
import { PluginSettings } from "../src/core/PluginSettings";
import { Whitelist } from "../src/core/Whitelist";
import { WhitelistYAMLPropertySettings } from "../src/core/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { Filter, FilterOperator } from "../src/core/Filter";


const file1 = new MockFileModel("path/","path/to/this",{
    path:"path/to/this",
    status:"Inbox",
    context:"Phone"
});
const file2 = new MockFileModel("path/","path/to/this",{
    path:"path/to/this",
    status:"InvalidValue",
    context:"Desk"
});
const file3 = new MockFileModel("path/","path/to/this",{
    path:"path/to/this",
    status:"Done",
    context:"Desk"
});
const file4 = new MockFileModel("path/","path/to/this",{
    status:"Inbox",
    context:"Desk"
});

let testerFiles = [file1,file2,file3,file4];


describe('FileAsTaskCollection: create object)', () => {
    let rootFolder = new MockFolderModel("path/","path/to/this",testerFiles);
    let settings:PluginSettings = new PluginSettings()
    .add(new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])))
    .add(new WhitelistYAMLPropertySettings("context","Desk",new Whitelist(["Desk","Phone"])));
    
    let fatc = new FileAsTaskCollection(rootFolder,settings);

    test('Test rootfolder exists and has children', () => {   
        expect(fatc.getRootFolder().children.length).toBe(4);
    });

    test('Test correct number of filesastasks', () => {   
        expect(fatc.get().length).toBe(4);
    });
});



describe('FileAsTaskCollection: Filter By (single)', () => {
    let rootFolder = new MockFolderModel("path/","path/to/this",testerFiles);
    let settings:PluginSettings = new PluginSettings()
    .add(new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])))
    .add(new WhitelistYAMLPropertySettings("context","Desk",new Whitelist(["Desk","Phone"])));
    
    let fatc = new FileAsTaskCollection(rootFolder,settings);

    let filter = new Filter("status","Inbox",FilterOperator.include);

    test('Test filtering', () => {   
        fatc.filterBy(filter);
        expect(fatc.get().length).toBe(2);
    });
});

describe('Filter By (single) - invalid status value', () => {
    let rootFolder = new MockFolderModel("path/","path/to/this",testerFiles);
    let settings:PluginSettings = new PluginSettings()
    .add(new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])))
    .add(new WhitelistYAMLPropertySettings("context","Desk",new Whitelist(["Desk","Phone"])));
    
    let fatc = new FileAsTaskCollection(rootFolder,settings);

    let filter = new Filter("status","invalid-status",FilterOperator.include);

    test('Test filtering by status - file with invalid value as its not part of the whitelist', () => {
        fatc.filterBy(filter);
        expect(fatc.get().length).toBe(0);
    });
});
 

describe('BulkFilterBy', () => {
    let rootFolder = new MockFolderModel("path/","path/to/this",testerFiles);
    let settings:PluginSettings = new PluginSettings()
    .add(new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])))
    .add(new WhitelistYAMLPropertySettings("context","Desk",new Whitelist(["Desk","Phone"])));
    
    let fatc = new FileAsTaskCollection(rootFolder,settings);

    let statusFilter = new Filter("status","Inbox",FilterOperator.include);
    let contextFilter = new Filter("context","Phone",FilterOperator.include);

    test('Test filtering by status (whitelistproperty)', () => {   
        fatc.bulkFilterBy([statusFilter,contextFilter]);
        expect(fatc.get().length).toBe(1);
    });
});


describe('Filter By not (single)', () => {
    let rootFolder = new MockFolderModel("path/","path/to/this",testerFiles);
    let settings:PluginSettings = new PluginSettings()
    .add(new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])))
    .add(new WhitelistYAMLPropertySettings("context","Desk",new Whitelist(["Desk","Phone"])));
    
    let fatc = new FileAsTaskCollection(rootFolder,settings);

    let filter = new Filter("status","Done",FilterOperator.exclude);

    test('Test filtering by status (whitelistproperty)', () => {   
        fatc.filterBy(filter);
        expect(fatc.get().length).toBe(3);
    });
});


// TODO: implement test
describe('Rebuild()', () => {
    test('empty test', () => {   
        expect(true).toBe(true);
    });
});



