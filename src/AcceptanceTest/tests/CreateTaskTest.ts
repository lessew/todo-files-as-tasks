import FileAsTaskPlugin from "main";
import { Logger } from "../Logger";
import { createFileAsTask } from "src/FileSystem/obsidian/CreateFileAsTask";
import { FileAsTask } from "src/FileSystem/FileAsTask";
import { getRoot} from "../MockItems";
import { CachedMetadata } from "obsidian";

export {}

export class CreateTaskTest{
    logger: Logger;
    plugin: FileAsTaskPlugin;
    result: boolean; 

    constructor(logger:Logger,plugin:FileAsTaskPlugin){
        this.logger = logger;
        this.plugin = plugin;
        this.result = true;
        return this;
    }

    async test():Promise<void>{
        this.logger.heading("Testing creation of a task");
        let root = getRoot();
        let project = "Finance";
        let basename = "New Finance Created Task";
        let status = "Inbox";
        let context = "Desk"
        let fullPath = root + "/" + project + "/" + basename + ".md"

        let data = {
            [FileAsTask.PROJECT_FIELD] : project,
            [FileAsTask.TITLE_FIELD]: basename,
            "status":status,
            "context":context
        }

        await createFileAsTask(root,data,this.plugin);    
        await this.plugin.delay(300);
        
        const file = this.plugin.obsidianFacade.getTFile(fullPath);
        this.logger.success(`File found on disk: ${file.path}`);
        const meta = this.plugin.obsidianFacade.getMeta(file);
        this.assertEqualsMeta(context,meta,"context");
        this.assertEqualsMeta(status,meta,"status");

        try{
            await this.plugin.obsidianApp.vault.delete(file)
        }
        catch(e){}
        
        await this.plugin.delay(300);
        try{
            const file = this.plugin.obsidianFacade.getTFile(fullPath);
            this.logger.error("Removing file failed: it was still found on disk");
        }
        catch(e){
            this.logger.success("searching for file threw an error, means it was propertly removed");
        }
        
    }

    assertEqualsMeta(expected:string,meta:CachedMetadata,property:string){
        try{
            const actualValue = meta.frontmatter![property];
            if (actualValue == expected) {
                this.logger.success(`Found ${actualValue} in YAML`)
            }
            else {
                this.logger.error(`FAIL: did not find ${expected} but ${actualValue} instead in ${property}`)
            }
        }
        catch(e){
            this.logger.error(`FAIL: threw Error. Tried to find ${expected} in ${property}`)
            this.setFailure();
        }
    }


    setFailure():void{
        this.result = false;
    }

    setSuccess():void{
        this.result = true;
    }


    isSuccess():boolean{
        return (this.result === true);
    }
}