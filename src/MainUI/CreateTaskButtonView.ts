import { App, Modal, Setting } from "obsidian";
import FileAsTaskPlugin from "main";
import { PropertySettings } from "src/Properties/PropertySettings";
import { PluginSettings } from "src/Configuration/PluginSettings";
import { PathPropertyHelper } from "src/Properties/PathPropertyHelper";


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
		const m: CreateTaskModal = new CreateTaskModal(this.plugin.obsidianApp, this.plugin.pluginSettings, this.pathPropertyHelper, async (result: Record<string, string>) => {
			//await ObsidianFileAsTaskModel.persist(this.root,result,this.plugin)
			console.log(result);
			this.plugin.reload();
		});
		m.open();
	}
}

export class CreateTaskModal extends Modal {
	result: Record<string, string>;
	settings: PluginSettings;
	root: string;
	pph: PathPropertyHelper;
	onSubmit: (result: Record<string, string>) => void;

	constructor(app: App, settings: PluginSettings, pph: PathPropertyHelper, onSubmit: (result: Record<string, string>) => void) {
		super(app);
		let result: Record<string, string> = {};
		//        let map:Map<string,PropertySettings>=settings.getAsMap();
		//       map.forEach((value,key) =>{
		//         result[key] = "";
		//    })
		this.result = result;
		this.pph = pph;
		this.onSubmit = onSubmit;
		this.settings = settings;
	}

	onOpen() {
		let { contentEl } = this;
		contentEl.createEl("h1", { text: "New Task" });

		// Title
		new Setting(contentEl)
			.setName("title")
			.addText((text) =>
				text.onChange((value) => {
					this.result["title"] = value
				}));

		// Project
		new Setting(contentEl)
			.setName("project")
			.addDropdown((dropdown) =>
				dropdown
					.addOptions(this.pph.getDirectorylist().toRecord())
					.onChange((value) => {
						this.result["project"] = value;
					})
				//.setValue(propSetting.defaultValue)
			);

		/*
		let map: Map<string, PropertySettings> = this.settings.propertySettings;

		map.forEach((value, key) => {
			let t = value.getType();
			if (t == "whitlist") {
				this.baseNameSetting(value as BasenamePropertySettings, contentEl);
			}
			else if (t == "toplevelfolder") {
				this.topLevelFolderSetting(value as ToplevelFolderPropertySettings, contentEl);
			}
			else if (t == "booleanYAML") {
				this.booleanYAMLSetting(value as BooleanYAMLPropertySettings, contentEl);
			}
			else if (t == "whitelistYAML") {
				this.whitelistYAMLSetting(value as WhitelistYAMLPropertySettings, contentEl);
			}
		})
		*/

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




	booleanYAMLSetting(propSetting: BooleanYAMLPropertySettings, contentEl: HTMLElement): void {
		new Setting(contentEl)
			.setName(propSetting.propName)
			.addDropdown((dropdown) =>
				dropdown
					.addOptions(propSetting.whitelist.toRecord())
					.onChange((value) => {
						this.result[propSetting.propName] = value;
					})
					.setValue(propSetting.defaultValue)
			);
		this.result[propSetting.propName] = propSetting.defaultValue;

	}

	whitelistYAMLSetting(propSetting: WhitelistYAMLPropertySettings, contentEl: HTMLElement): void {
		new Setting(contentEl)
			.setName(propSetting.propName)
			.addDropdown((dropdown) =>
				dropdown
					.addOptions(propSetting.whitelist.toRecord())
					.onChange((value) => {
						this.result[propSetting.propName] = value;
					})
					.setValue(propSetting.defaultValue)
			);
		this.result[propSetting.propName] = propSetting.defaultValue;

	}
}
