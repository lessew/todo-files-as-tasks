import FileAsTaskPlugin from "main";
import { Setting } from "obsidian";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { PropertySettings } from "../PropertySettings";
import { BooleanPropertySettings } from "./BooleanPropertySettings";

export class BooleanPropertyView {
	propSettings: BooleanPropertySettings;
	fileAsTask: FileAsTask;
	propName: string;
	plugin: FileAsTaskPlugin;

	constructor(propName: string, propSettings: PropertySettings, plugin: FileAsTaskPlugin) {
		this.propSettings = propSettings as BooleanPropertySettings;
		this.propName = propName;
		this.plugin = plugin;
	}

	build(fat: FileAsTask, rootElement: HTMLElement): void {
		let text = fat.get(this.propName);
		let hover = "";
		this.fileAsTask = fat;
		let a: HTMLElement = rootElement.createEl("span", { cls: "file-as-task", text: text, title: hover });
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

	async handleEvent(event: Event): Promise<void> {
		let newVal = this.propSettings.getNewToggleValue(this.fileAsTask.get(this.propName));
		await this.fileAsTask.setYAMLProperty(this.propName, newVal);
		await this.refreshUI();
	}

	async refreshUI(): Promise<void> {
		await this.plugin.reload();
	}
}
