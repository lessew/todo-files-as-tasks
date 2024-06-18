import FileAsTaskPlugin from "main";
import { App, Modal, Setting } from "obsidian";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { PathPropertyHelper } from "../PathPropertyHelper";
import { PropertyView } from "../PropertyView";

export class TitlePropertyView extends PropertyView {
	plugin: FileAsTaskPlugin;
	fat: FileAsTask;
	pathPropertyHelper: PathPropertyHelper;

	constructor(pps: PathPropertyHelper, fat: FileAsTask, plugin: FileAsTaskPlugin) {
		super();
		this.pathPropertyHelper = pps;
		this.plugin = plugin;
		this.fat = fat;
	}

	build(rootElement: HTMLElement): void {
		let edit: HTMLElement = rootElement.createEl("a", { cls: "yatodo-edit", text: this.fat.getTitle(), title: "Edit" });
		edit.addEventListener("click", this); // executes this.handleEvent method
	}

	async handleEvent(event: Event) {
		const m: TitleModel = new TitleModel(this.plugin.obsidianApp, this.fat.getTitle(), async (result) => {
			if (this.pathPropertyHelper.validate(result)) {
				await this.fat.setTitle(result);
				await this.refreshUI();
			}
			else {
				// TODO: return error to user;
				console.log("ERROR in validating new value")
			}
		});
		m.open();
	}

	async refreshUI(): Promise<void> {
		await this.plugin.reload();
	}
}

class TitleModel extends Modal {
	result: string;
	onSubmit: (result: string) => void;
	value: string;

	constructor(app: App, value: string, onSubmit: (result: string) => void) {
		super(app);
		this.value = value;
		this.onSubmit = onSubmit;
	}

	onOpen() {
		let { contentEl } = this;
		contentEl.createEl("h1", { text: "Task title (and filename)" });

		new Setting(contentEl)
			.setName("Name")
			.setClass("file-as-task")
			.addText((text) => {
				text.setValue(this.value);
				text.onChange((value) => {
					this.result = value
				});
			})

		new Setting(contentEl)
			.addButton((btn) =>
				btn
					.setButtonText("Submit")
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmit(this.result);
					}));
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}
}
