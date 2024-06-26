import FileAsTaskPlugin from "main";
import { Logger } from "../Logger";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { CachedMetadata } from "obsidian";
import { File } from "src/Filesystem/File";
import { CodeBlock } from "src/CodeBlock";
import { ObsidianFileSystem } from "src/Filesystem/obsidian/ObsidianFileSystem";

export class CreateTaskTest {
	logger: Logger;
	plugin: FileAsTaskPlugin;
	result: boolean;
	codeBlock: CodeBlock;

	constructor(logger: Logger, plugin: FileAsTaskPlugin, codeBlock: CodeBlock) {
		this.logger = logger;
		this.codeBlock = codeBlock;
		this.plugin = plugin;
		this.result = true;
		return this;
	}

	async test(): Promise<void> {
		this.logger.heading("Testing creation of a task");
		// Setup
		let directory = "todo-home/Finance";
		let basename = "New Finance Created Task";
		let path = directory + "/" + basename + ".md";

		let fs = new ObsidianFileSystem(this.plugin);

		// Create file and set properties
		let file = await File.createEmptyFile(path, fs, this.plugin.delay);
		let fat = new FileAsTask(file, this.codeBlock.config.getPathPropertyHelper());
		fat.setYAMLProperty("context", "Desk");
		fat.setYAMLProperty("status", "Inbox");
		fat.setYAMLProperty("starred", "⭐");

		// Assert 
		await this.plugin.delay(300);
		this.assertEquals(directory, fat.getProject());
		this.assertEquals(basename, fat.getTitle());
		let tf = this.plugin.obsidianFacade.getTFile(path);
		let meta = this.plugin.obsidianFacade.getMeta(tf);
		this.assertEqualsMeta("Desk", meta, "context");
		this.assertEqualsMeta("Inbox", meta, "status");

		this.deleteFile(path)
	}

	assertEquals(expected: string, actual: string) {
		if (expected == actual) {
			this.logger.success(`${expected} found in fileastask`)
		}
		else {
			this.logger.error(`${expected} epected but found ${actual}`)
		}
	}

	assertEqualsMeta(expected: string, meta: CachedMetadata, property: string) {
		try {
			const actualValue = meta.frontmatter![property];
			if (actualValue == expected) {
				this.logger.success(`Found ${actualValue} in YAML`)
			}
			else {
				this.logger.error(`FAIL: did not find ${expected} but ${actualValue} instead in ${property}`)
			}
		}
		catch (e) {
			this.logger.error(`FAIL: threw Error. Tried to find ${expected} in ${property}`)
			this.setFailure();
		}
	}

	async deleteFile(fullPath: string): Promise<void> {
		let tfile = this.plugin.obsidianFacade.getTFile(fullPath);
		await this.plugin.obsidianApp.vault.delete(tfile);

		await this.plugin.delay(150);
		try {
			const file = this.plugin.obsidianFacade.getTFile(fullPath);
			this.logger.error("Removing file failed: it was still found on disk");
		}
		catch (e) {
			this.logger.success("File removed succesfully");
		}
	}

	setFailure(): void {
		this.result = false;
	}

	setSuccess(): void {
		this.result = true;
	}


	isSuccess(): boolean {
		return (this.result === true);
	}
}
