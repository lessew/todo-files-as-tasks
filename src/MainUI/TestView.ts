import FileAsTaskPlugin from "main";
import { Logger } from "src/IntegrationTest/Logger";
import { TaskOperationsTest } from "src/IntegrationTest/tests/TaskOperationsTest";
import { VaultHasExpectedFilesTest } from "src/IntegrationTest/tests/VaultHasExpectedFilesTest";

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