import { PROPERTYNAMES, Settings } from "src/core/FileAsTaskSettings";
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
        project:"IRS Hotline",
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
    "Taxes 2023", //"Finance/Taxes 2023",
    "IRS hotline", //"Finance/Taxes 2023/IRS Hotline",
    "Kids",
    "Groceries"
]

const yaml = `
rootPath: todo-home
action: list`;
    

const settings = {
        [PROPERTYNAMES.context]:{
            propName:PROPERTYNAMES.context,
            whitelist:new Whitelist(["Desk","Deep","Phone","Read","None"]),
            defaultValue:"None"
        },
        [PROPERTYNAMES.status]:{
            propName:PROPERTYNAMES.status,
            whitelist:new Whitelist(["Inbox","Next","Deferred","Waiting","Done"]),
            defaultValue:"Inbox"
        },
        [PROPERTYNAMES.starred]:{
            propName:PROPERTYNAMES.starred,
            whitelist:new Whitelist(["✰","⭐"]),
            defaultValue:"✰"
        },
        [PROPERTYNAMES.title]:{
            propName:PROPERTYNAMES.title,
            defaultValue:"no title"
        },
        [PROPERTYNAMES.project]:{
            propName:PROPERTYNAMES.project,
            defaultValue:"no project"
        }
    } as Settings;
    

export function getSettings():Settings{
        return settings;
}
export function getYamlListAllFiles():string{
    return yaml;
}

export function getExpectedFiles():{path:string,title:string,project:string,yaml:{context?:string,status?:string,starred?:string}}[]{
    return expectedFiles;
}

export function getExpectedFolders():string[]{
    return expectedFolders;
}