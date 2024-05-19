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
        await this.plugin.delay(150);
        await this.actAssertProjectChange();
        await this.plugin.delay(150);
        await this.actAssertYAMLPropertiesChange();

        return this;
    }

    arrange():void{
        this.expectedHolidayBillTask = getExpectedHolidayBillFile();
        this.logger.log(`Setting up test with file ${this.expectedHolidayBillTask.path}`);
        this.settings = getSettings();
        this.logger.log("settings retrieved");
        this.actualHolidayBillFileModel = ObsidianFile.create(this.expectedHolidayBillTask.root,this.expectedHolidayBillTask.path,this.plugin);
        this.logger.log("Set up filemodel");
        this.actualHolidayBillTask = new FileAsTask(this.actualHolidayBillFileModel,this.settings);
        this.logger.log("Set up the FileAsTask object");
        this.logger.success("Loaded all objects, ready to test")
    }

    async actAssertTitleChange():Promise<void>{    
        let originalPath = this.actualHolidayBillFileModel.path;
        let newPath = "todo-home/Finance/newValue.md";

        this.logger.log(`---Test: changing title of file ${originalPath} to ${newPath}---`)
        await (this.actualHolidayBillTask).set(FileAsTask.TITLE_FIELD,"newValue");
        await this.assertFileExistsWithDelay(newPath)

        await this.plugin.delay(150); // prepare for teardown
        this.logger.log(`Moving  file back to original location ${originalPath}`);
        await this.actualHolidayBillTask.set(FileAsTask.TITLE_FIELD, this.expectedHolidayBillTask.title);
        await this.assertFileExistsWithDelay(originalPath);
    }

    async actAssertProjectChange():Promise<void>{
        if(!this.isRunning()){ return;}
        let originalPath = "todo-home/Finance/Pay holiday bill.md";
        let newPath = "todo-home/Groceries/Pay holiday bill.md";

        this.logger.log(`---Test: changing project from Finance to Groceries---`);
        await this.actualHolidayBillTask.set(FileAsTask.PROJECT_FIELD, "Groceries");
        await this.assertFileExistsWithDelay(newPath);
        await this.plugin.delay(150); // prep for teardown
        this.logger.log("Moving back to original folder");
        await this.actualHolidayBillTask.set(FileAsTask.PROJECT_FIELD, this.expectedHolidayBillTask.project);
        await this.assertFileExistsWithDelay(originalPath);
    }

    async actAssertYAMLPropertiesChange(){
        if(!this.isRunning()) {return;}

        this.logger.log("---Test: changing yaml properties---")
        await this.actualHolidayBillTask.set("context", "Desk");
        await this.actualHolidayBillTask.set("status", "Inbox");
        await this.actualHolidayBillTask.set("starred", "✰");
        this.logger.log("Asserting if values have properly changed");
        await this.assertSingleYAMLPropertyWithDelay(this.expectedHolidayBillTask.path,"starred", "✰");
        await this.assertSingleYAMLPropertyWithDelay(this.expectedHolidayBillTask.path,"status", "Inbox");
        await this.assertSingleYAMLPropertyWithDelay(this.expectedHolidayBillTask.path,"context", "Desk");

        // tear down
        this.logger.log("Putting back to original values");
        await this.actualHolidayBillTask.set("context", this.expectedHolidayBillTask.yaml.context!);
        await this.actualHolidayBillTask.set("status", this.expectedHolidayBillTask.yaml.status!);
        await this.actualHolidayBillTask.set("starred", this.expectedHolidayBillTask.yaml.starred!);
        this.logger.log("Asserting if reverting to original values has succeeded")
        await this.assertSingleYAMLPropertyWithDelay(this.expectedHolidayBillTask.path,"starred",this.expectedHolidayBillTask.yaml.starred!);
        await this.assertSingleYAMLPropertyWithDelay(this.expectedHolidayBillTask.path,"status", this.expectedHolidayBillTask.yaml.status!);
        await this.assertSingleYAMLPropertyWithDelay(this.expectedHolidayBillTask.path,"context", this.expectedHolidayBillTask.yaml.context!);

    }

    async assertSingleYAMLPropertyWithDelay(path:string, name:string,expectedValue:string):Promise<void>{
        await this.plugin.delay(150);
        const file = this.plugin.obsidianFacade.getTFile(path);
        const meta = this.plugin.obsidianFacade.getMeta(file);

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

    async assertFileExistsWithDelay(fileID:string):Promise<void>{
        await this.plugin.delay(150);
        try {
            const file = this.plugin.obsidianFacade.getTFile(fileID);
            if (file.path === fileID) {
                this.logger.success(`File found at ${fileID}`)
            }
            else {
                this.logger.error(`Could not find file at ${fileID}.`)
                this.setFailure();
            }
        }
        catch (e) {
            this.logger.error(`Could not find file and threw error at ${fileID}`);
            this.logger.error(e);
            this.setFailure();
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