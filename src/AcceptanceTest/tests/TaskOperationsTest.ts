import { Logger } from "../Logger";
import { ExpectedFileType, getExpectedHolidayBillFile, getSettings } from "../MockItems";
import { CachedMetadata } from "obsidian";
import FileAsTaskPlugin from "main";
import { PluginSettings } from "src/Configuration/PluginSettings";
import { FileModel } from "src/FileSystem/FileModel";
import { FileAsTask } from "src/FileSystem/FileAsTask";
import { ObsidianFile } from "src/FileSystem/obsidian/ObsidianFile";

export class TaskOperationsTest{
    logger:Logger
    settings:PluginSettings;
    actualHolidayBillFileModel:FileModel;
    actualHolidayBillTask:FileAsTask;
    expectedHolidayBillTask:ExpectedFileType;
    result:boolean;
    plugin:FileAsTaskPlugin;

    constructor(logger:Logger,plugin:FileAsTaskPlugin){
        this.logger = logger;
        this.plugin = plugin;
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
        this.actualHolidayBillFileModel = ObsidianFile.create(this.expectedHolidayBillTask.root,this.expectedHolidayBillTask.path,this.plugin);
        this.actualHolidayBillTask = new FileAsTask(this.actualHolidayBillFileModel,this.settings);
        this.logger.success("Loaded objects")
    }

    async actAssertTitleChange():Promise<void>{    
        this.logger.headingSub("Test: changing title")
        await (this.actualHolidayBillTask).set(FileAsTask.TITLE_FIELD,"newValue");
        const fileID1 = "todo-home/Finance/newValue.md";
        const file1 = this.plugin.obsidianFacade.getTFile(fileID1);

        if(file1.path === fileID1){
            this.logger.success(`Moved file to ${fileID1}`)
        }
        else{
            this.logger.error(`Could not move file to ${fileID1}.`)
            this.setFailure();
        }

        // teardown
        await this.actualHolidayBillTask.set(FileAsTask.TITLE_FIELD,this.expectedHolidayBillTask.title);
    }

    async actAssertProjectChange():Promise<void>{
        if(this.isRunning()){
            this.logger.headingSub("Test: changing project")
            await this.actualHolidayBillTask.set(FileAsTask.PROJECT_FIELD,"Groceries");
            const fileID = "todo-home/Groceries/Pay holiday bill.md";
            try{
                const file = this.plugin.obsidianFacade.getTFile(fileID);
                if(file.path === fileID){
                    this.logger.success(`Moved file to ${fileID}`)
                }
                else{
                    this.logger.error(`Could not move file to ${fileID}.`)
                    this.setFailure();
                }
            }
            catch(e){
                this.logger.error(`Could not move file to ${fileID}`)
                this.setFailure();
            }         
            await this.actualHolidayBillTask.set(FileAsTask.PROJECT_FIELD,this.expectedHolidayBillTask.project);
        }
    }

    async actAssertYAMLPropertiesChange(){
        if(this.isRunning()){
            this.logger.headingSub("Test: changing yaml properties")
            await this.actualHolidayBillTask.set("context","Desk");
            await this.actualHolidayBillTask.set("status","Inbox");
            await this.actualHolidayBillTask.set("starred","✰");

            setTimeout(() => {
                const file = this.plugin.obsidianFacade.getTFile(this.expectedHolidayBillTask.path);
                const meta = this.plugin.obsidianFacade.getMeta(file);
    
                this.assertSingleYAMLProperty(meta,"starred","✰");
                this.assertSingleYAMLProperty(meta,"status","Inbox");
                this.assertSingleYAMLProperty(meta,"context","Desk");
    
                // tear down
                this.actualHolidayBillTask.set("context",this.expectedHolidayBillTask.yaml.context!);
                this.actualHolidayBillTask.set("status",this.expectedHolidayBillTask.yaml.status!);
                this.actualHolidayBillTask.set("starred",this.expectedHolidayBillTask.yaml.starred!);
            },300)
           
        }
    }

    assertSingleYAMLProperty(meta:CachedMetadata,name:string,expectedValue:string):void{
        try{
            const actualvalue = meta.frontmatter![name];
            if(actualvalue==expectedValue){
                this.logger.success(`Found ${actualvalue} in ${name}`)
            }
            else{
                this.logger.error(`Did not find '${expectedValue}' but found '${actualvalue}' instead`)
            }
        }
        catch(e){
            this.logger.error(`Trying to access the YAML looking for ${name} threw an exception`);
            console.error(e);
        }
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