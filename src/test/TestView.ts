import { App } from "obsidian";
import { Logger } from "./Logger";
import { VaultHasExpectedFilesTest } from "./tests/VaultHasExpectedFilesTest";
import { TaskOperationsTest } from "./tests/TaskOperationsTest";

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
        if(await this.testVaultHasExpectedFiles()){
            this.testTaskOperations();
        }
    }

    async testVaultHasExpectedFiles():Promise<boolean>{
        let tester = new VaultHasExpectedFilesTest(this.logger);
        const test = await tester.test();
        return test.isSuccess();
    }

    testTaskOperations():void{
        const test = new TaskOperationsTest(this.logger).test();
    }

}