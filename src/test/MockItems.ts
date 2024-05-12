import { DEFAULT_SETTINGS, PluginSettings } from "src/core/PluginSettings";
import { Whitelist } from "src/core/Whitelist";

/**
 * Make sure thise files exists in the vault
 */
const expectedFiles = [
    {
        path:"todo-home/Finance/Finalize finance weekend NYC.md",
        root:"todo-home",
        title:"Finalize finance weekend NYC",
        project:"Finance",
        yaml: {context: "Deep",status: "Waiting",starred: "✰"}
    },
    {
        path:"todo-home/Finance/Pay holiday bill.md",
        root:"todo-home",
        title:"Pay holiday bill",
        project:"Finance",
        yaml: {status: "Done",context: "Deep",starred: "⭐"}
    },
    {
        path:"todo-home/Finance/Taxes 2023/Get income statement work.md",
        root:"todo-home",
        title:"Get income statement work",
        project:"Finance/Taxes 2023",
        yaml: {context: "None",status: "Deferred",starred: "⭐"}
    },
    {
        path: "todo-home/Finance/Taxes 2023/Get mortgage details 2024.md",
        root:"todo-home",
        title:"Get mortgage details 2024",
        project:"Finance/Taxes 2023",
        yaml: {context: "None",status: "Waiting",starred: "⭐"}
    },
    {
        path: "todo-home/Finance/Taxes 2023/IRS Hotline/Ask details re taxes 2023.md",
        root:"todo-home",
        title:"Ask details re taxes 2023",
        project:"Finance/Taxes 2023/IRS Hotline",
        yaml: { context: "None",status: "Waiting",starred: "⭐"}
    },
    {
        path: "todo-home/Groceries/Bread.md",
        root:"todo-home",
        title:"Bread",
        project:"Groceries",
        yaml: {context: "None",status: "Inbox",starred: "✰"}
    },
    {
        path:"todo-home/Groceries/Peppers.md",
        root:"todo-home",
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
    

export function getSettings():PluginSettings{
        return settings;
}
export function getYamlListAllFiles():string{
    return yaml;
}

export type ExpectedFileType = {path:string,root:string,title:string,project:string,yaml:{context?:string,status?:string,starred?:string}};

export function getExpectedFiles():ExpectedFileType[]{
    return expectedFiles;
}

export function getExpectedHolidayBillFile():ExpectedFileType{
    return expectedFiles[1];
}

export function getExpectedFolders():string[]{
    return expectedFolders;
}