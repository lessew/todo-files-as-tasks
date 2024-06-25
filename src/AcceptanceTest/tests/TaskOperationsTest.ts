import { Logger } from "../Logger";
import { ExpectedFileType, getExpectedHolidayBillFile, getSettings } from "../MockItems";
import FileAsTaskPlugin from "main";
import { PluginSettings } from "src/Configuration/PluginSettings";
import { CodeBlock } from "src/CodeBlock";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { File } from "src/Filesystem/File";
import { ObsidianFilesystem } from "src/Filesystem/obsidian/ObsidianFilesystem";

export class TaskOperationsTest {
	logger: Logger
	expectedFileUnderTest: ExpectedFileType;
	result: boolean;
	plugin: FileAsTaskPlugin;
	codeBlock: CodeBlock;
	fatUnderTest: FileAsTask;

	constructor(logger: Logger, plugin: FileAsTaskPlugin, codeBlock: CodeBlock) {
		this.logger = logger;
		this.plugin = plugin;
		this.codeBlock = codeBlock;
		return this;
	}

	async test(): Promise<TaskOperationsTest> {
		this.logger.heading("Testing TaskOperations")
		this.arrange();
		await this.actAssertTitleChange();
		await this.plugin.delay(150);
		await this.actAssertProjectChange();
		//await this.plugin.delay(150);
		//await this.actAssertYAMLPropertiesChange();

		return this;
	}

	arrange(): void {
		this.expectedFileUnderTest = getExpectedHolidayBillFile();
		let fs = new ObsidianFilesystem(this.plugin);
		let file = new File(this.expectedFileUnderTest.path, fs);
		let fat = new FileAsTask(file, this.codeBlock.config.getPathPropertyHelper());
		this.fatUnderTest = fat;
	}

	async actAssertTitleChange(): Promise<void> {
		//let originalPath = this.actualHolidayBillFileModel.path;
		let newPath = "todo-home/Finance/newValue.md";
		let originalPath = this.expectedFileUnderTest.path;

		this.logger.em(`Test changing title from [${originalPath}] to [${newPath}]`);

		await (this.fatUnderTest).setTitle("newValue");
		await this.assertFileExistsWithDelay(newPath);

		await this.plugin.delay(150); // prepare for teardown
		this.logger.log(`Put title back to original`);
		await (this.fatUnderTest).setTitle(this.expectedFileUnderTest.title);
		await this.assertFileExistsWithDelay(originalPath);
	}

	async actAssertProjectChange(): Promise<void> {
		if (!this.isRunning()) { return; }
		let originalPath = "todo-home/Finance/Pay holiday bill.md";
		let newPath = "todo-home/Groceries/Pay holiday bill.md";

		this.logger.em(`Change project from [Finance] to [Groceries]`);
		await this.fatUnderTest.setProject("todo-home/Groceries");
		await this.assertFileExistsWithDelay(newPath);
		await this.plugin.delay(150); // prep for teardown
		this.logger.log("Move back to [Groceries]");
		await this.fatUnderTest.setProject(this.expectedFileUnderTest.project);
		await this.assertFileExistsWithDelay(originalPath);
	}

	async actAssertYAMLPropertiesChange() {
		return;
		/*
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
		*/
	}

	async assertSingleYAMLPropertyWithDelay(path: string, name: string, expectedValue: string): Promise<void> {
		return;
		/*
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
		*/
	}

	async assertFileExistsWithDelay(fileID: string): Promise<void> {
		await this.plugin.delay(150);
		try {
			const file = this.plugin.obsidianFacade.getTFile(fileID);
			if (file.path === fileID) {
				this.logger.success(`Valid: [${fileID}]`)
			}
			else {
				this.logger.error(`Invalid: [${fileID}].`)
				this.setFailure();
			}
		}
		catch (e) {
			this.logger.error(`Error thrown at: [${fileID}]`);
			this.logger.error(e);
			this.setFailure();
		}
	}

	setFailure(): void {
		this.result = false;
	}

	isRunning(): boolean {
		return (this.result != false);
	}

	isSuccess(): boolean {
		return (this.result === true);
	}
}
