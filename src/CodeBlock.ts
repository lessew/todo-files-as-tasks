import FileAsTaskPlugin from "main";
import { Configuration } from "./Configuration/Configuration";
import { CreateTaskButtonView } from "./FileAsTask/ui/CreateTaskButtonView";
import { TestView } from "./AcceptanceTest/ui/TestView";
import { FileAsTaskCollection } from "./List/FileAsTaskCollection";
import { Directory } from "./FileSystem/Directory";
import { ObsidianIOFactory } from "./FileSystem/Obsidian/ObsidianIOFactory";
import { FileAsTaskFactory } from "./FileAsTask/FileAsTaskFactory";
import { FileAsTask } from "./FileAsTask/FileAsTask";
import { ObsidianPropertyViewFactory } from "./Properties/PropertyViewFactory";
import { ListController } from "./List/ListController";
import { CodeBlockSettings } from "./Configuration/CodeBlockSettings";
import { TestController } from "./AcceptanceTest/TestController";

export class CodeBlock {
	source: string;
	el: HTMLElement;
	plugin: FileAsTaskPlugin;
	root: string;
	rootDirectory: Directory;
	config: Configuration;

	//	state: CodeBlockState;

	constructor(source: string, el: HTMLElement, plugin: FileAsTaskPlugin) {
		this.source = source;
		this.el = el;
		this.plugin = plugin;
	}

	async reload(): Promise<void> {
		this.el.innerHTML = "";
		await this.load();
	}
	/*	
			async processState(): Promise<void> {
				this.state.process();
		
			}
			async view(): Promise<void> {
				this.state.view();
			}
			*/
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

		if (this.config.getAction() == CodeBlockSettings.ACTION_LIST) {
			this.displayActionList();
		}
		else if (this.config.getAction() == CodeBlockSettings.ACTION_TEST) {
			this.displayTest();
		}
		else if (this.config.getAction() == CodeBlockSettings.ACTION_CREATE_BUTTON) {
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
		let pvf = new ObsidianPropertyViewFactory();


		const fileAsTaskCollection = new FileAsTaskCollection(filesAsTask);
		fileAsTaskCollection.bulkFilterBy(filters);
		//fileAsTaskCollection.groupBy('project');
		//fileAsTaskCollection.sortBy('context','ASC');
		let cb = new ListController(
			fileAsTaskCollection,
			this.config.getSettings(),
			this.config.getPathPropertyHelper(),
			this.plugin,
			pvf
		)
		cb.build(this.el);
	}

	displayCreateTaskButton(): void {
		const view = new CreateTaskButtonView(this.root, this.plugin, this.config.getPathPropertyHelper(), new ObsidianPropertyViewFactory());
		view.build(this.el);
	}

	displayTest(): void {
		const tc = new TestController(this.plugin, this, this.el);
		tc.build();

	}
}
