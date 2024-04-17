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
        if(this.testVaultHasExpectedFiles()){
            this.testTaskOperations();
        }
    }

    testVaultHasExpectedFiles():boolean{
        const test = new VaultHasExpectedFilesTest(this.logger).test();
        return test.isSuccess();
    }

    testTaskOperations():void{
        const test = new TaskOperationsTest(this.logger).test();
    }

}