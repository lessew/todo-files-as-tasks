import { App } from "obsidian";
import { Logger } from "./Logger";
import { VaultHasExpectedFilesTest } from "./tests/VaultHasExpectedFilesTest";
import { TaskOperationsTest } from "./tests/TaskOperationsTest";
import FileAsTaskPlugin from "main";

export class TestView{
    assertions:string[];
    logger:Logger;
    vaultIsValid:boolean;
    plugin:FileAsTaskPlugin;

    constructor(plugin:FileAsTaskPlugin,el:HTMLElement){
        this.assertions = [];
        this.plugin = plugin;
        this.logger = new Logger(el);
        this.vaultIsValid = false;
    }

    async main(){
        if(await this.testVaultHasExpectedFiles()){
            this.testTaskOperations();
        }
    }

    async testVaultHasExpectedFiles():Promise<boolean>{
        let tester = new VaultHasExpectedFilesTest(this.logger,this.plugin);
        const test = await tester.test();
        return test.isSuccess();
    }

    testTaskOperations():void{
        const test = new TaskOperationsTest(this.logger,this.plugin).test();
    }

}