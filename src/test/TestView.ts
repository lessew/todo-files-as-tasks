import { assert } from "console";
import { App } from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { DEFAULT_SETTINGS, FATPROPERTY, FATSettings } from "src/main/FileAsTaskSettings";
import { FolderList } from "src/main/obsidian/FolderList";
import {FileList} from "src/main/obsidian/FileList";
import { text } from "stream/consumers";
import {File} from "../core/File";
import { ObsidianWrapper } from "src/main/obsidian/ObsidianWrapper";

export class TestView{
    obsidianApp:App;
    assertions:string[];

    constructor(app:App){
        this.obsidianApp = app;
        this.assertions = [];
    }

    async main(){
        const wrapper = ObsidianWrapper.getInstance();
        const [bucketExpectedFiles,expectedFiles] = this.getExpectedFiles();
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

        let actualPayHolidayBillFile:unknown = null;
        for(let i=0;i<actualFileList.files.length;i++){
            let thisFile = actualFileList.files[i];
            let expectedFileIndex = bucketExpectedFiles.get(thisFile.fullPath.fileID);
            this.assertTrue((typeof expectedFileIndex!="undefined"),`Looking for file "${thisFile.fullPath.fileID}"`);
            
            if(thisFile.fullPath.fileID == "todo-home/Finance/Pay holiday bill.md"){
                actualPayHolidayBillFile = thisFile;
            }

            let expectedFile = expectedFiles[expectedFileIndex as number];

            this.assert(thisFile.fullPath.fileID,expectedFile.path,`Checking file: ${thisFile.fullPath.fileID}`);
            this.assert(thisFile.get("title"),expectedFile.title,"Check title for this file");
            this.assert(thisFile.get("status"),expectedFile.yaml.status,"Check status for this file");
            this.assert(thisFile.get("context"),expectedFile.yaml.context,"Check context for this file");
            this.assert(thisFile.get("starred"),expectedFile.yaml.starred,"Check context for this file");
        }

        const expectedPayHolidayBillFile = expectedFiles[1];

        (actualPayHolidayBillFile as File).properties["title"].setValue("newValue");
        setTimeout(() =>{
            const fileID = "todo-home/Finance/newValue.md";
            const file1 = wrapper.getTFile(fileID);
            this.assert(file1.path,fileID,"check if basename / title rename works");

            setTimeout(() =>{
                (actualPayHolidayBillFile as File).properties["title"].setValue(expectedPayHolidayBillFile.title);
            },150)

        },150)
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

    assertTrue(isTrue:boolean,message:string){
        let result = "";
        if(isTrue){
            result = `True: ${message}`;
        }
        else{
            result = `FALSE: ${message}`;
        }
        this.assertions.push(result);
    }

    build(el:HTMLElement):void{
        setTimeout(() =>{
            el.createEl("h1",{text:"Running tests..."});
            this.assertions.forEach(assertion => {
                el.createEl("div",{text:assertion,cls:"warning"});
            })
        },1000)
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
    getExpectedFiles():[Map<string,number>,{path:string,title:string,project:string,yaml:{context?:string,status?:string,starred?:string}}[]]{
        const result = [
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

        let bucket:Map<string,number> = new Map<string,number>();
        for(let i=0;i<result.length;i++){
            const path = result[i].path;
            bucket.set(path,i);
        }

        return [bucket,result];
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