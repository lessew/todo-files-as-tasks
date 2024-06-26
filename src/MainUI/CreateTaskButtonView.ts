import { App, Modal, Setting } from "obsidian";
import FileAsTaskPlugin from "main";
import { PropertySettings } from "src/Properties/PropertySettings";
import { PluginSettings } from "src/Configuration/PluginSettings";
import { PathPropertyHelper } from "src/Properties/PathPropertyHelper";
import { WhitelistPropertySettings } from "src/Properties/Whitelist/WhitelistPropertySettings";
import { BooleanPropertySettings } from "src/Properties/Boolean/BooleanPropertySettings";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { ObsidianFileSystem } from "src/FileSystem/Obsidian/ObsidianFileSystem";
import { File } from "src/FileSystem/File";

export class CreateTaskButtonView {
	root: string
	plugin: FileAsTaskPlugin;
	pathPropertyHelper: PathPropertyHelper;

	constructor(root: string, plugin: FileAsTaskPlugin, pathPropertyHelper: PathPropertyHelper) {
		this.plugin = plugin;
		this.pathPropertyHelper = pathPropertyHelper;
		this.root = root;
	}

	build(rootElement: HTMLElement): void {
		let a: HTMLElement = rootElement.createEl("a", { text: "new task" });
		a.addEventListener("click", this); // executes handleEvent
	}

	handleEvent(event: Event) {
		const m: CreateTaskModal = new CreateTaskModal(
			this.plugin.obsidianApp,
			this.plugin,
			this.plugin.pluginSettings,
			this.pathPropertyHelper
		);
		m.open();
	}
}

export class CreateTaskModal extends Modal {
	result: Record<string, string>;
	settings: PluginSettings;
	root: string;
	pph: PathPropertyHelper;
	plugin: FileAsTaskPlugin;

	constructor(app: App, plugin: FileAsTaskPlugin, settings: PluginSettings, pph: PathPropertyHelper) {
		super(app);
		let result: Record<string, string> = {};
		result.project = pph.getDirectorylist().toArray()[0];
		settings.getPropertySettings().forEach((ps: PropertySettings, key) => {
			result[key] = ps.getDefaultValue();
		})
		this.result = result;
		this.pph = pph;
		this.settings = settings;
		this.plugin = plugin;
	}
	async onSubmit(): Promise<void> {
		console.log("submit:");
		console.log(this.result);

		let fs = new ObsidianFileSystem(this.plugin);

		if (!this.pph.isValidFilename(this.result.title)) {
			console.error(`${this.result.title} is not a valid filename`);
			return;
		}
		if (!this.pph.isValidDirectory(this.result.project)) {
			console.error(`${this.result.project} is not a valid directory`);
			return;
		}

		let fullPath = this.result.project + "/" + this.result.title + ".md";

		console.log(fullPath)
		// Create file and set properties
		let file = await File.createEmptyFile(fullPath, fs, this.plugin.delay);
		let fat = new FileAsTask(file, this.pph);
		console.log(fat);
		for (const key in this.result) {
			if (!(key == "title" || key == "project")) {
				fat.setYAMLProperty(key, this.result[key])
			}
		}
		this.plugin.reload();
	}

	onOpen() {
		let { contentEl } = this;
		contentEl.createEl("h1", { text: "New Task" });

		// Title
		new Setting(contentEl)
			.setName("title")
			.addText((text) =>
				text.onChange((value) => {
					if (this.pph.isValidFilename(value)) {
						this.result["title"] = value
					}
					else {
						console.error("invalid filename");
					}
				}));

		// Project
		console.log(this.pph.getDirectorylist().toArray())
		new Setting(contentEl)
			.setName("project")
			.addDropdown((dropdown) =>
				dropdown
					.addOptions(this.pph.getDirectorylist().toRecord())
					.setValue(this.pph.getDirectorylist().toArray()[1])
					.onChange((value) => {
						this.result["project"] = value;
					})
			);

		// YAML Properties

		let map: Map<string, PropertySettings> = this.settings.propertySettings;

		map.forEach((propSetting, key) => {
			let t = propSetting.getType();
			if (t == "whitelist") {
				let wl = propSetting as WhitelistPropertySettings;
				new Setting(contentEl)
					.setName(key)
					.addDropdown((dropdown) =>
						dropdown
							.addOptions(wl.getWhitelist().toRecord())
							.onChange((value) => {
								this.result[key] = value;
							})
							.setValue(wl.getDefaultValue())
					);
			}
			else if (t == "boolean") {
				let b = propSetting as BooleanPropertySettings;
				new Setting(contentEl)
					.setName(key)
					.addDropdown((dropdown) =>
						dropdown
							.addOptions(b.getWhitelist().toRecord())
							.onChange((value) => {
								this.result[key] = value;
							})
							.setValue(b.getDefaultValue())
					);
			}
		})

		new Setting(contentEl)
			.addButton((btn) =>
				btn
					.setButtonText("Submit")
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmit();
					}));
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}




}
