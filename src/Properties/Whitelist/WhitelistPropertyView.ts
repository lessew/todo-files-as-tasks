import FileAsTaskPlugin from "main";
import { SuggestModal, App } from "obsidian";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { PropertyView } from "../PropertyView";
import { Whitelist } from "../Whitelist";
import { WhitelistPropertySettings } from "./WhitelistPropertySettings";

export class WhitelistPropertyView extends PropertyView {
	propSettings: WhitelistPropertySettings;
	fileAsTask: FileAsTask;
	propName: string;
	plugin: FileAsTaskPlugin;

	constructor(propName: string, propSettings: WhitelistPropertySettings, fat: FileAsTask, plugin: FileAsTaskPlugin) {
		super();
		this.propSettings = propSettings;
		this.propName = propName;
		this.fileAsTask = fat;
		this.plugin = plugin;
	}

	build(rootElement: HTMLElement): void {
		let text: string = this.fileAsTask.getYAMLProperty(this.propName);
		let hover: string = "";
		let a: HTMLElement = rootElement.createEl("span", { cls: "file-as-task", text: text, title: hover });
		a.addEventListener("click", this); // executes handleEvent
	}

	async handleEvent(event: Event) {
		const m: WhitelistYAMLModal = new WhitelistYAMLModal(
			this.propSettings.getWhitelist(),
			async (item) => {
				if (this.propSettings.validate(item)) {
					await this.fileAsTask.setYAMLProperty(this.propName, item);
					await this.refreshUI();
				}
				else {
					// TODO: handle error
					console.log("errro in input");
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


export class WhitelistYAMLModal extends SuggestModal<string>{

	validValues: string[];
	onSubmit: (result: string) => void;

	constructor(whitelist: Whitelist, onSubmit: (result: string) => void, app: App) {
		super(app);
		this.onSubmit = onSubmit;
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
