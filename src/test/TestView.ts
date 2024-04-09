import { assert } from "console";
import { App } from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { DEFAULT_SETTINGS, FATPROPERTY, FATSettings } from "src/main/FileAsTaskSettings";
import { FolderList } from "src/main/obsidian/FolderList";
import {FileList} from "src/main/obsidian/FileList";
import { text } from "stream/consumers";
import {File} from "../core/File";

export class TestView{
    obsidianApp:App;
    assertions:string[];

    constructor(app:App){
        this.obsidianApp = app;
        this.assertions = [];
    }

    async main(){
        const expectedFiles = this.getExpectedFiles();
        const expectedFolders = this.getExpectedFolders();

        const source = this.getYAML();
        const settings = this.getSettings();
        
        const parser = new YAMLParser();
        parser.loadSource(source);
        
        const rootPath = parser.parseRootPath();

        const actualFolderList = new FolderList();
        actualFolderList.init(rootPath as string);

        this.assertFolderList(actualFolderList,expectedFolders);
        
        settings.project.allowedValues = actualFolderList.folders;

        const actualFileList = new FileList();
        actualFileList.init(rootPath as string,settings);

        this.assert(actualFileList.files.length,expectedFiles.length,"Number of found files correct?");

        for(let i=0;i<actualFileList.files.length;i++){
            let thisFile = actualFileList.files[i];
            this.assert(thisFile.fullPath.fileID,expectedFiles[i].path,`Checking file: ${thisFile.fullPath.fileID}`);
            this.assert(thisFile.get("title"),expectedFiles[i].title,"Check title for this file");
            this.assert(thisFile.get("status"),expectedFiles[i].yaml.status,"Check status for this file");
            this.assert(thisFile.get("context"),expectedFiles[i].yaml.context,"Check context for this file");
            this.assert(thisFile.get("starred"),expectedFiles[i].yaml.starred,"Check context for this file");
        }
    }

    assertFolderList(actualFolderList:FolderList,expectedFolders:string[]):void{
        this.assert(actualFolderList.folders.length,expectedFolders.length,"Number of found folders correct?");
    }

    assert(actual:unknown,expected:unknown,message:string){
        let result = "";
        if(actual === expected){
            result = `true: "${message}" - ${expected}`;
        }
        else{
            result = `FALSE: ${message} 
            Actual: "${actual}", 
            Expected: "${expected}"`
        }
        this.assertions.push(result);
    }

    build(el:HTMLElement):void{
        el.createEl("h1",{text:"Running tests..."});
        this.assertions.forEach(assertion => {
            el.createEl("div",{text:assertion,cls:"warning"});
        })
        // tbi
    }

    getSettings():FATSettings{
        return {
            [FATPROPERTY.context]:{
                allowedValues:["Desk","Deep","Phone","Read","None"],
                defaultValue:"None"
            },
            [FATPROPERTY.status]:{
                allowedValues:["Inbox","Next","Deferred","Waiting","Done"],
                defaultValue:"Inbox"
            },
            [FATPROPERTY.starred]:{
                allowedValues:["✰","⭐"],
                defaultValue:"✰"
            },
            [FATPROPERTY.title]:{
                defaultValue:"no title"
            },
            [FATPROPERTY.project]:{
                defaultValue:"no project"
            }
        } as FATSettings
        
    }
    getExpectedFiles():{path:string,title:string,project:string,yaml:{context?:string,status?:string,starred?:string}}[]{
        return [
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
                title:"Groceries",
                project:"Peppers",
                yaml: {}
            }
        ];
    }

    getExpectedFolders():string[]{
        return [
            "Finance",
            "Finance/Taxes 2023",
            "Finance/Taxes 2023/IRS Hotline",
            "Groceries",
            "Kids"
        ]
    }

    getYAML():string{
const yaml = `
rootPath: todo-home
action: list`;
return yaml;

    }
}