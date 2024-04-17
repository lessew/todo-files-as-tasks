import { App } from "obsidian";
import { YAMLParser } from "src/core/YAMLParser";
import { PROPERTYNAMES, Settings } from "src/core/FileAsTaskSettings";
import { ObsidianWrapper } from "src/main/obsidian/ObsidianWrapper";
import { FolderList } from "src/core/FolderList";
import { ObsidianFolder } from "src/main/obsidian/ObsidianFolder";
import { FileList } from "src/core/FileList";
import { FileAsTask } from "src/core/FileAsTask";
import {assert,assertTrue,assertFolderList} from "./Assertions"
import { Whitelist } from "src/core/Whitelist";
import { Logger } from "./Logger";
import { VaultHasExpectedFilesTest } from "./tests/VaultHasExpectedFilesTest";

export class TestView{
    obsidianApp:App;
    assertions:string[];
    logger:Logger;
    vaultIsValid:boolean;

    constructor(app:App,el:HTMLElement){
        this.obsidianApp = app;
        this.assertions = [];
        this.logger = new Logger(el);
        this.vaultIsValid = false;
    }

    async main(){
        this.testVaultHasExpectedFiles();
    }

    async main2(){

        this.testVaultHasExpectedFiles();

            

        
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
           
            assert(thisFile.get("status"),expectedFile.yaml.status,"Check status for this file");
            assert(thisFile.get("context"),expectedFile.yaml.context,"Check context for this file");
            assert(thisFile.get("starred"),expectedFile.yaml.starred,"Check starred for this file");
            
        }

        const expectedPayHolidayBillFile = expectedFiles[1];

        await (actualPayHolidayBillFile as FileAsTask).set(PROPERTYNAMES.title,"newValue");
        const fileID1 = "todo-home/Finance/newValue.md";
        const file1 = wrapper.getTFile(fileID1);
        assert(file1.path,fileID1,"check if basename / title rename works");
        (actualPayHolidayBillFile as FileAsTask).set(PROPERTYNAMES.title,expectedPayHolidayBillFile.title);

        
        // rename project - 
        // TODO issue detected: the properties do not get updated if the filepath is update. need to fix
        await (actualPayHolidayBillFile as FileAsTask).set("project","Groceries");
        const fileID2 = "todo-home/Groceries/Pay holiday bill.md";
        const file2 = wrapper.getTFile(fileID2);
        assert(file2.path,fileID2,"check if project rename works");
        (actualPayHolidayBillFile as FileAsTask).set("project",expectedPayHolidayBillFile.project);
        
    }

    testVaultHasExpectedFiles():void{
        const test = new VaultHasExpectedFilesTest(this.logger).test();
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

}