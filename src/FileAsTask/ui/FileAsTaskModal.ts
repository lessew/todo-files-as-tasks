import FileAsTaskPlugin from "main";
import { Modal, App, Setting } from "obsidian";
import { PluginSettings } from "src/Configuration/PluginSettings";
import { ObsidianFileSystem } from "src/FileSystem/Obsidian/ObsidianFileSystem";
import { PathPropertyHelper } from "src/Properties/PathPropertyHelper";
import { ProjectPropertyView } from "src/Properties/Project/ProjectPropertyView";
import { PropertySettings } from "src/Properties/PropertySettings";
import { PropertyViewFactory } from "src/Properties/PropertyViewFactory";
import { TitlePropertyView } from "src/Properties/Title/TitlePropertyView";
import { FileAsTask } from "../FileAsTask";
import { File } from "src/FileSystem/File";

export class FileAsTaskModal extends Modal {
	result: Record<string, string>;
	settings: PluginSettings;
	root: string;
	pph: PathPropertyHelper;
	plugin: FileAsTaskPlugin;
	propertyViewFactory: PropertyViewFactory;

	constructor(app: App) {
		super(app);
	}


	init(plugin: FileAsTaskPlugin, settings: PluginSettings, pph: PathPropertyHelper, pvf: PropertyViewFactory) {
		let result: Record<string, string> = {};
		result.project = pph.getDirectorylist().toArray()[0];
		settings.getPropertySettings().forEach((ps: PropertySettings, key) => {
			result[key] = ps.getDefaultValue();
		})
		this.result = result;
		this.pph = pph;
		this.settings = settings;
		this.plugin = plugin;
		this.propertyViewFactory = pvf;
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
		let titlePropertyView = new TitlePropertyView(this.pph, this.plugin);
		titlePropertyView.buildCreateUI(contentEl, (value => {
			if (this.pph.isValidFilename(value)) {
				this.result["title"] = value
			}
			else {
				console.error("invalid filename: ${value}");
			}
		}));

		// Project
		let propertyProjectView = new ProjectPropertyView(this.pph, this.plugin);
		propertyProjectView.buildCreateUI(contentEl, (value => { this.result["project"] = value; }));

		// YAML Properties
		let map: Map<string, PropertySettings> = this.settings.propertySettings;

		map.forEach((propSetting, key) => {
			let propView = this.propertyViewFactory.createPropertyView(key, propSetting, this.plugin);
			propView.buildCreateUI(contentEl, (value: string) => {
				this.result[key] = value;
			});

		})

		// Submit
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
