import FileAsTaskPlugin from "main";
import { SuggestModal, App, Setting } from "obsidian";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { PropertySettings } from "../PropertySettings";
import { PropertyView } from "../PropertyView";
import { WhitelistPropertySettings } from "./WhitelistPropertySettings";

export class WhitelistPropertyView extends PropertyView {
	propSettings: WhitelistPropertySettings;
	propName: string;
	plugin: FileAsTaskPlugin;
	fileAsTask: FileAsTask;

	constructor(propName: string, propSettings: PropertySettings, plugin: FileAsTaskPlugin) {
		super();
		this.propSettings = propSettings as WhitelistPropertySettings;
		this.propName = propName;
		this.plugin = plugin;
	}

	build(fat: FileAsTask, rootElement: HTMLElement): void {
		let text: string = fat.getYAMLProperty(this.propName);
		let hover: string = "";
		let a: HTMLElement = rootElement.createEl("span", { cls: "file-as-task", text: text, title: hover });
		this.fileAsTask = fat;
		a.addEventListener("click", this); // executes handleEvent
	}

	buildCreateUI(el: HTMLElement, onchange: (value: string) => void): void {
		new Setting(el)
			.setName(this.propName)
			.addDropdown((dropdown) =>
				dropdown
					.addOptions(this.propSettings.getWhitelist().toRecord())
					.onChange(onchange)
					.setValue(this.propSettings.getDefaultValue())
			);
	}

	buildSettingsUI(): void {

	}

	async handleEvent(event: Event) {
		const m: WhitelistYAMLModal = new WhitelistYAMLModal(
			this.propSettings.getWhitelist().toArray(),
			async (item) => {
				if (this.propSettings.validate(item)) {
					await this.fileAsTask.setYAMLProperty(this.propName, item);
					await this.refreshUI();
				}
				else {
					console.error(`error in input: ${item} is not a valid value for ${this.propName}`);
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

	constructor(validValues: string[], onSubmit: (result: string) => void, app: App) {
		super(app);
		this.onSubmit = onSubmit;
		this.validValues = validValues;
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
