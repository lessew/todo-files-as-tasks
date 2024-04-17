import { assert } from "console";
import { Logger } from "../Logger";
import { FileAsTask } from "src/core/FileAsTask";
import { ExpectedFileType, getExpectedHolidayBillFile, getSettings } from "../MockItems";
import { PROPERTYNAMES, Settings } from "src/core/FileAsTaskSettings";
import { FileModel } from "src/core/Interfaces/FileModel";
import { ObsidianFile } from "src/main/obsidian/ObsidianFile";
import { FileAsTaskFactory } from "src/main/FileAsTaskFactory";
import { ObsidianWrapper } from "src/main/obsidian/ObsidianWrapper";

export class TaskOperationsTest{
    logger:Logger
    settings:Settings;
    actualHolidayBillFileModel:FileModel;
    actualHolidayBillTask:FileAsTask;
    expectedHolidayBillTask:ExpectedFileType;
    result:boolean;


    constructor(logger:Logger){
        this.logger = logger;
        return this;
    }

    async test():Promise<TaskOperationsTest>{
        this.logger.heading("Testing TaskOperations")
        this.arrange();
        await this.actAssertTitleChange();
        await this.actAssertProjectChange();
        this.actAssertYAMLPropertiesChange();

        return this;
    }

    arrange():void{
        this.logger.headingSub("Arranging")
        this.expectedHolidayBillTask = getExpectedHolidayBillFile();
        this.settings = getSettings();
        this.actualHolidayBillFileModel = new ObsidianFile(this.expectedHolidayBillTask.path);
        this.actualHolidayBillTask = FileAsTaskFactory.loadFileAsTask(this.actualHolidayBillFileModel,this.settings);
        this.logger.success("Loaded objects")
    }

    async actAssertTitleChange():Promise<void>{    
        this.logger.headingSub("Test: changing title")
        await (this.actualHolidayBillTask).set(PROPERTYNAMES.title,"newValue");
        const fileID1 = "todo-home/Finance/newValue.md";
        const file1 = ObsidianWrapper.getInstance().getTFile(fileID1);

        if(file1.path === fileID1){
            this.logger.success(`Moved file to ${fileID1}`)
        }
        else{
            this.logger.error(`Could not move file to ${fileID1}.`)
            this.setFailure();
        }

        // teardown
        await this.actualHolidayBillTask.set(PROPERTYNAMES.title,this.expectedHolidayBillTask.title);
    }

    async actAssertProjectChange():Promise<void>{
        if(this.isRunning()){
            this.logger.headingSub("Test: changing project")

            await this.actualHolidayBillTask.set("project","Groceries");
            const fileID = "todo-home/Groceries/Pay holiday bill.md";
            const file = ObsidianWrapper.getInstance().getTFile(fileID);

            if(file.path === fileID){
                this.logger.success(`Moved file to ${fileID}`)
            }
            else{
                this.logger.error(`Could not move file to ${fileID}.`)
                this.setFailure();
            }
            await this.actualHolidayBillTask.set(PROPERTYNAMES.project,this.expectedHolidayBillTask.project);
        }
    }

    actAssertYAMLPropertiesChange(){
        
    }


    setFailure():void{
        this.result = false;
    }

    isRunning():boolean{
        return (this.result != false);
    }

    isSuccess():boolean{
        return (this.result === true);
    }






}