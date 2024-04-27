import { DEFAULT_SETTINGS, Settings } from "src/core/Settings";
import { Whitelist } from "src/core/Whitelist";

/**
 * Make sure thise files exists in the vault
 */
const expectedFiles = [
    {
        path:"todo-home/Finance/Finalize finance weekend NYC.md",
        title:"Finalize finance weekend NYC",
        project:"Finance",
        yaml: {context: "Deep",status: "Waiting",starred: "✰"}
    },
    {
        path:"todo-home/Finance/Pay holiday bill.md",
        title:"Pay holiday bill",
        project:"Finance",
        yaml: {status: "Done",context: "Deep",starred: "⭐"}
    },
    {
        path:"todo-home/Finance/Taxes 2023/Get income statement work.md",
        title:"Get income statement work",
        project:"Taxes 2023",
        yaml: {context: "None",status: "Deferred",starred: "⭐"}
    },
    {
        path: "todo-home/Finance/Taxes 2023/Get mortgage details 2024.md",
        title:"Get mortgage details 2024",
        project:"Taxes 2023",
        yaml: {context: "None",status: "Waiting",starred: "⭐"}
    },
    {
        path: "todo-home/Finance/Taxes 2023/IRS hotline/Ask details re taxes 2023.md",
        title:"Ask details re taxes 2023",
        project:"IRS hotline",
        yaml: { context: "None",status: "Waiting",starred: "⭐"}
    },
    {
        path: "todo-home/Groceries/Bread.md",
        title:"Bread",
        project:"Groceries",
        yaml: {context: "None",status: "Inbox",starred: "✰"}
    },
    {
        path:"todo-home/Groceries/Peppers.md",
        title:"Peppers",
        project:"Groceries",
        yaml: {context:"None",status:"Inbox",starred:"✰"}
    }
];

const expectedFolders = [
    "Finance",
    "Finance/Taxes 2023",
    "Finance/Taxes 2023/IRS Hotline",
    "Kids",
    "Groceries"
]

const yaml = `
rootPath: todo-home
action: list`;
    

const settings = DEFAULT_SETTINGS;
    

export function getSettings():Settings{
        return settings;
}
export function getYamlListAllFiles():string{
    return yaml;
}

export type ExpectedFileType = {path:string,title:string,project:string,yaml:{context?:string,status?:string,starred?:string}};

export function getExpectedFiles():ExpectedFileType[]{
    return expectedFiles;
}

export function getExpectedHolidayBillFile():ExpectedFileType{
    return expectedFiles[1];
}

export function getExpectedFolders():string[]{
    return expectedFolders;
}