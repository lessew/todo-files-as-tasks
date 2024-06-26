import { App, SuggestModal } from "obsidian";
import FileAsTaskPlugin from "main";
import { PathPropertyHelper } from "../PathPropertyHelper";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { PropertyView } from "../PropertyView";
import { Whitelist } from "../Whitelist";

export class ProjectPropertyView extends PropertyView {
	plugin: FileAsTaskPlugin;
	fat: FileAsTask;
	pathPropertySettings: PathPropertyHelper;

	constructor(pps: PathPropertyHelper, fat: FileAsTask, plugin: FileAsTaskPlugin) {
		super();
		this.pathPropertySettings = pps;
		this.plugin = plugin;
		this.fat = fat;
	}

	build(rootElement: HTMLElement): void {
		const text = this.fat.getProject();
		let a: HTMLElement = rootElement.createEl("span", { text: text, cls: "file-as-task" });
		a.addEventListener("click", this); // executes handleEvent
	}


	async handleEvent(event: Event) {
		const m: ProjectModal = new ProjectModal(
			this.pathPropertySettings.getDirectorylist(),
			this.fat.getProject(),
			async (item) => {
				if (this.pathPropertySettings.isValidDirectory((item))) {
					await this.fat.setProject(item);
					await this.refreshUI();
				}
				else {
					// TODO: return error to user
					console.log("error: new project did not validate");
				}
			},
			this.plugin.obsidianApp
		);
		m.open();
	}

	async refreshUI(): Promise<void> {
		await this.plugin.reload();
	}
}


class ProjectModal extends SuggestModal<string>{

	whitelist: Whitelist;
	currentValue: string;
	validValues: string[];
	onSubmit: (result: string) => void;

	constructor(whitelist: Whitelist, currentVal: string, onSubmit: (result: string) => void, app: App) {
		super(app);
		this.onSubmit = onSubmit;
		this.currentValue = currentVal;
		this.validValues = whitelist.toArray();
	}

	getSuggestions(query: string): string[] | Promise<string[]> {
		return this.validValues;
	}

	renderSuggestion(value: string, el: HTMLElement) {
		el.createEl("div", { text: value });
	}

	onChooseSuggestion(item: string, evt: MouseEvent | KeyboardEvent) {
		this.onSubmit(item);
	}
}
