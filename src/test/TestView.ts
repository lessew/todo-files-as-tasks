import { App } from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { DEFAULT_SETTINGS,PROPERTYNAMES, Settings } from "src/core/FileAsTaskSettings";
import { ObsidianWrapper } from "src/main/obsidian/ObsidianWrapper";
import { FolderList } from "src/core/FolderList";
import { ObsidianFolder } from "src/main/obsidian/ObsidianFolder";
import { FileList } from "src/core/FileList";
import { FileAsTask } from "src/core/FileAsTask";
import {assert,assertTrue,assertFolderList} from "./Assertions"
import { Whitelist } from "src/core/Whitelist";

export class TestView{
    obsidianApp:App;
    assertions:string[];

    constructor(app:App){
        this.obsidianApp = app;
        this.assertions = [];
    }

    async main(){
        // expected values
        const [bucketExpectedFiles,expectedFiles] = this.getExpectedFiles();
        const expectedFolders = this.getExpectedFolders();

        // input values
        const source = this.getYAML();
        const settings = this.getSettings();
        
        // instantiate main objects
        const wrapper = ObsidianWrapper.getInstance();
        const parser = new YAMLParser();
        parser.loadSource(source);
        const rootPath = parser.parseRootPath();        
        const rootFolder = new ObsidianFolder(rootPath as string);

        const folders = FolderList.getFolders(rootFolder);

        assertFolderList(folders,expectedFolders);
        
        settings.project.whitelist = FolderList.getFoldersAsWhitelist(rootFolder);

        let tasks:FileAsTask[] = FileList.getFilesAsTasks(rootFolder,settings);
        
        assert(tasks.length,expectedFiles.length,"Number of found files correct?");

        let actualPayHolidayBillFile:unknown = null;
        for(let i=0;i<tasks.length;i++){
            let thisFile = tasks[i];
            let expectedFileIndex = bucketExpectedFiles.get(thisFile.file.path);
            assertTrue((typeof expectedFileIndex!="undefined"),`Looking for file "${thisFile.file.path}"`);
            
            if(thisFile.file.path == "todo-home/Finance/Pay holiday bill.md"){
                actualPayHolidayBillFile = thisFile;
            }

            let expectedFile = expectedFiles[expectedFileIndex as number];

            assert(thisFile.file.path,expectedFile.path,`Checking file: ${thisFile.file.path}`);
            assert(thisFile.get("title"),expectedFile.title,"Check title for this file");
            assert(thisFile.get("starred"),expectedFile.yaml.starred,"Check starred for this file");
            if(thisFile.file.path == "todo-home/Groceries/Peppers.md"){
                assert(thisFile.get("context")," ","Check default string returned for null context");
                assert(thisFile.get("status"),"Inbox","Check default string returned for null status");
            }
            else{
                assert(thisFile.get("status"),expectedFile.yaml.status,"Check status for this file");
                assert(thisFile.get("context"),expectedFile.yaml.context,"Check context for this file");
            }

        }

        const expectedPayHolidayBillFile = expectedFiles[1];
/*
        // rename title
        await (actualPayHolidayBillFile as FileAsTask).set("title","newValue");
        const fileID1 = "todo-home/Finance/newValue.md";
        const file1 = wrapper.getTFile(fileID1);
        assert(file1.path,fileID1,"check if basename / title rename works");
        (actualPayHolidayBillFile as FileAsTask).set("title",expectedPayHolidayBillFile.title);

        // rename project - 
        // TODO issue detected: the properties do not get updated if the filepath is update. need to fix
        await (actualPayHolidayBillFile as FileAsTask).set("project","Groceries");
        const fileID2 = "todo-home/Groceries/Pay holiday bill.md";
        const file2 = wrapper.getTFile(fileID2);
        assert(file2.path,fileID2,"check if project rename works");
        (actualPayHolidayBillFile as FileAsTask).set("project",expectedPayHolidayBillFile.project);
        */
    }


    build(el:HTMLElement):void{
        setTimeout(() =>{
            el.createEl("h1",{text:"Running tests..."});
            el.createEl("span",{text:"See console.log output"});
            this.assertions.forEach(assertion => {
                el.createEl("div",{text:assertion,cls:"warning"});
            })
        },1000)
    }

    getSettings():Settings{
        return {
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
        } as Settings
        
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
                title:"Peppers",
                project:"Groceries",
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
            "Taxes 2023", //"Finance/Taxes 2023",
            "IRS hotline", //"Finance/Taxes 2023/IRS Hotline",
            "Kids",
            "Groceries"
        ]
    }

    getYAML():string{
const yaml = `
rootPath: todo-home
action: list`;
return yaml;

    }
}