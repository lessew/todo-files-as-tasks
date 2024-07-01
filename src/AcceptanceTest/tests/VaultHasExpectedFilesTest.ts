import { Logger } from "../Logger";
import { getExpectedFiles, getExpectedFolders, ExpectedFileType } from "../MockItems";
import FileAsTaskPlugin from "main";
import { FileAsTaskCollection } from "src/FileAsTask/FileAsTaskCollection";
import { CodeBlock } from "src/CodeBlock";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { FileAsTaskFactory } from "src/FileAsTask/FileAsTaskFactory";
import { Filter, FilterOperator } from "src/FileAsTask/Filter";

export class VaultHasExpectedFilesTest {
	logger: Logger;
	rootPath: string;
	codeBLock: CodeBlock;
	result: boolean;
	plugin: FileAsTaskPlugin;
	fileAsTaskCollection: FileAsTaskCollection;
	fats: FileAsTask[];

	constructor(logger: Logger, plugin: FileAsTaskPlugin, codeBlock: CodeBlock) {
		this.codeBLock = codeBlock;
		this.logger = logger;
		this.plugin = plugin;
		return this;
	}

	async test(): Promise<VaultHasExpectedFilesTest> {
		this.logger.heading("Testing VaultHasExpectedFiles")

		let fats: FileAsTask[] = FileAsTaskFactory.loadFilesAsTask(this.codeBLock.rootDirectory, this.codeBLock.config.getPathPropertyHelper())
		this.fileAsTaskCollection = new FileAsTaskCollection(fats);
		this.fats = fats;
		this.assertDirectories();
		this.assertFilesAsTask();
		this.asssertFilter();


		if (this.result != false) {
			this.result = true;
		}
		else {
			this.logger.error("ERROR some tests did not run successfully, aborting")
		}

		return this;
	}

	assertDirectories() {
		this.logger.em(("Asserting directories are found"));
		const expectedFolders = getExpectedFolders();
		const actualFolders = this.codeBLock.rootDirectory.getDirectories().map(dir => dir.fullPath);
		if (expectedFolders.length == actualFolders.length) {
			this.logger.success("Right amount of folders found")
		}
		else {
			this.logger.error(`Found ${actualFolders.length} folders but expected ${expectedFolders.length}`)
			this.setFailure();
		}


		for (let i = 0; i < expectedFolders.length; i++) {
			if (!actualFolders.contains(expectedFolders[i])) {
				this.logger.error(`${expectedFolders[i]} does not seem to exists as folder`);
				this.logger.error(`Folder found are: ${actualFolders.join(",")}`);
				this.setFailure();
				return;
			}
			else {
				this.logger.success(`Folder '${expectedFolders[i]}' was found`)
			}
		}
	}

	assertFilesAsTask(): void {

		this.logger.em(("Asserting files as files as tasks are found"));
		const expectedFiles = getExpectedFiles();
		const tasks = this.fileAsTaskCollection.get();
		if (tasks.length != expectedFiles.length) {
			this.logger.error(`Expected ${expectedFiles.length} files but found ${tasks.length}`);
			this.setFailure();
			return;
		}
		else {
			this.logger.success(`Found right amount of files: ${expectedFiles.length}`);
		}

		for (let i = 0; i < expectedFiles.length; i++) {
			const expectedNeedle = expectedFiles[i];
			const foundNeedle = tasks.find((aTask) => {
				return aTask.file.fullPath == expectedNeedle.path;
			})
			//this.logger.log(`--Testing file ${expectedNeedle.title}`);
			if (foundNeedle == undefined) {
				this.logger.error(`Could not find file ${expectedFiles[i].path}`)
				this.result = false;
				return;
			}
			this.logger.success(`Found file ${expectedFiles[i].path}`)

			this.assertSingleTask(expectedNeedle, foundNeedle);
		}
	}
	assertSingleTask(expectedFile: ExpectedFileType, actualTask: FileAsTask) {
		this.logger.em("Asserting file: " + expectedFile.title);
		this.assertSinglePropertyValue("project", actualTask, expectedFile.project);
		this.assertSinglePropertyValue("title", actualTask, expectedFile.title);
		this.assertSinglePropertyValue("status", actualTask, expectedFile.yaml.status!);
		this.assertSinglePropertyValue("context", actualTask, expectedFile.yaml.context!);
		this.assertSinglePropertyValue("starred", actualTask, expectedFile.yaml.starred!);

	}

	assertSinglePropertyValue(propName: string, aTask: FileAsTask, expectedValue: string) {
		if (aTask.get(propName) != expectedValue) {
			this.setFailure();
			this.logger.error(`file[${propName}]!=[${expectedValue}] --- Found [${aTask.get(propName)}] `)
		}
		else {
			this.logger.success(`file[${propName}]==[${expectedValue}] `);
		}
	}

	asssertFilter() {

		this.logger.em(("Asserting filters work"));
		let f: Filter;
		f = new Filter("project", "todo-home/Finance", FilterOperator.include);
		this.assertFilterAmount("todo/home/finance", 2, this.fileAsTaskCollection, f);
		this.reloadFileAsTaskCollection();

		f = new Filter("project", "todo-home/Finance/Taxes 2023/IRS Hotline", FilterOperator.include);
		this.assertFilterAmount("todo-home/Finance/Taxes/IRS Hotline", 1, this.fileAsTaskCollection, f);
		this.reloadFileAsTaskCollection();

		f = new Filter("status", "Inbox", FilterOperator.include);
		this.assertFilterAmount("status/Inbox", 1, this.fileAsTaskCollection, f);
		this.reloadFileAsTaskCollection();
	}

	assertFilterAmount(m: string, expected: number, fatc: FileAsTaskCollection, f: Filter) {


		let actual = fatc.filterBy(f).get().length;
		if (actual == expected) {
			this.logger.success(`[${m}] - Found ${actual} files`);
		}
		else {
			this.logger.error(`[${m}] - Expected ${expected} but found ${actual} files`);
			this.setFailure();
		}
	}
	setFailure(): void {

		this.result = false;
	}

	isSuccess(): boolean {
		return (this.result === true);
	}

	reloadFileAsTaskCollection() {
		this.fileAsTaskCollection = new FileAsTaskCollection(this.fats);

	}

}
