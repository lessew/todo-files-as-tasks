import FileAsTaskPlugin from "main";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { BooleanPropertySettings } from "./BooleanPropertySettings";

export class BooleanPropertyView {
	propSettings: BooleanPropertySettings;
	fileAsTask: FileAsTask;
	propName: string;
	plugin: FileAsTaskPlugin;

	constructor(propName: string, propSettings: BooleanPropertySettings, fat: FileAsTask, plugin: FileAsTaskPlugin) {
		this.propSettings = propSettings;
		this.propName = propName;
		this.fileAsTask = fat;
		this.plugin = plugin;
	}

	build(rootElement: HTMLElement): void {
		let text = this.fileAsTask.get(this.propName);
		let hover = "";

		let a: HTMLElement = rootElement.createEl("span", { cls: "file-as-task", text: text, title: hover });
		a.addEventListener("click", this); // executes handleEvent
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
