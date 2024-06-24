import FileAsTaskPlugin from "main";
import { Configuration } from "./Configuration/Configuration";
import { CodeBlockParser } from "./Configuration/CodeBlockParser";
import { CreateTaskButtonView } from "./MainUI/CreateTaskButtonView";
import { TaskListView } from "./MainUI/TaskListView";
import { TestView } from "./MainUI/TestView";
import { FileAsTaskCollection } from "./FileAsTask/FileAsTaskCollection";
import { Directory } from "./Filesystem/Directory";
import { ObsidianIOFactory } from "./Filesystem/obsidian/ObsidianIOFactory";
import { FileAsTaskFactory } from "./FileAsTask/FileAsTaskFactory";
import { FileAsTask } from "./FileAsTask/FileAsTask";

export class CodeBlock {
	source: string;
	el: HTMLElement;
	plugin: FileAsTaskPlugin;
	root: string;
	rootDirectory: Directory;
	config: Configuration;

	constructor(source: string, el: HTMLElement, plugin: FileAsTaskPlugin) {
		this.source = source;
		this.el = el;
		this.plugin = plugin;
	}

	async reload(): Promise<void> {
		this.el.innerHTML = "";
		await this.load();
	}

	async load(): Promise<void> {
		this.config = new Configuration();
		this.config.loadSource(this.source);
		this.config.loadSettings(this.plugin.pluginSettings);
		this.config.loadRootPath();
		this.config.loadAction();
		if (this.config.stateIsError()) {
			this.displayUserError(this.config.getErrorState());
			return;
		}
		let iof = new ObsidianIOFactory(this.plugin);

		let cdResult = iof.createDirectory(this.config.getRootPath());
		if (cdResult instanceof Error) {
			this.displayUserError(cdResult);
			return;
		}
		else {
			this.rootDirectory = cdResult;
		}

		this.config.loadPathPropertyHelper(this.rootDirectory.getDirectories().map(dir => dir.fullPath));

		if (this.config.getAction() == CodeBlockParser.ACTION_LIST) {
			this.displayActionList();
		}
		else if (this.config.getAction() == CodeBlockParser.ACTION_TEST) {
			this.displayTest();
		}
		else if (this.config.getAction() == CodeBlockParser.ACTION_CREATE_BUTTON) {
			this.displayCreateTaskButton();
		}

	}

	displayUserError(error: Error) {
		const msg = error.message;// + "\n" + this.source;
		this.el.createEl("div", { text: msg });
	}

	displayActionList(): void {
		this.config.loadFilters();
		if (this.config.stateIsError()) {
			this.displayUserError(this.config.getErrorState());
			return;
		}

		const filters = this.config.getFilters();
		const filesAsTask: FileAsTask[] = FileAsTaskFactory.loadFilesAsTask(
			this.rootDirectory,
			this.config.getPathPropertyHelper()
		);

		const fileAsTaskCollection = new FileAsTaskCollection(filesAsTask);
		fileAsTaskCollection.bulkFilterBy(filters);
		//fileAsTaskCollection.groupBy('project');
		//fileAsTaskCollection.sortBy('context','ASC');
		let view = new TaskListView(
			fileAsTaskCollection,
			this.config.getSettings(),
			this.config.getPathPropertyHelper(),
			this.plugin
		);
		view.build(this.el);
	}

	displayCreateTaskButton(): void {
		const view = new CreateTaskButtonView(this.root, this.plugin);
		view.build(this.el);
	}

	displayTest(): void {
		const testView = new TestView(this.plugin, this, this.el);
		testView.main();
	}
}
