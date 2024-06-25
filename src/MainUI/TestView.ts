import FileAsTaskPlugin from "main";
import { Logger } from "src/AcceptanceTest/Logger";
import { CreateTaskTest } from "src/AcceptanceTest/tests/CreateTaskTest";
import { TaskOperationsTest } from "src/AcceptanceTest/tests/TaskOperationsTest";
import { VaultHasExpectedFilesTest } from "src/AcceptanceTest/tests/VaultHasExpectedFilesTest";
import { CodeBlock } from "src/CodeBlock";

export class TestView {
	assertions: string[];
	logger: Logger;
	vaultIsValid: boolean;
	plugin: FileAsTaskPlugin;
	codeBlock: CodeBlock;

	constructor(plugin: FileAsTaskPlugin, cb: CodeBlock, el: HTMLElement) {
		this.assertions = [];
		this.plugin = plugin;
		this.logger = new Logger(el);
		this.vaultIsValid = false;
		this.codeBlock = cb;
	}

	async main() {
		if (await this.testVaultHasExpectedFiles()) {
			await this.testTaskOperations();
			// force wait due to frontmatter not being saved to disk synchronously
			await this.plugin.delay(150);
			await this.testCreateTask();
		}
	}

	async testVaultHasExpectedFiles(): Promise<boolean> {
		let tester = new VaultHasExpectedFilesTest(this.logger, this.plugin, this.codeBlock);
		const test = await tester.test();
		return test.isSuccess();
	}

	async testTaskOperations(): Promise<void> {
		const test = await new TaskOperationsTest(this.logger, this.plugin, this.codeBlock).test();
	}

	async testCreateTask(): Promise<void> {
		const test = await new CreateTaskTest(this.logger, this.plugin, this.codeBlock).test();
	}

}
