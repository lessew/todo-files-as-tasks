import { App, Modal, Setting } from "obsidian";
import FileAsTaskPlugin from "main";
import { PropertySettings } from "src/Properties/PropertySettings";
import { PluginSettings } from "src/Configuration/PluginSettings";
import { PathPropertyHelper } from "src/Properties/PathPropertyHelper";
import { WhitelistPropertySettings } from "src/Properties/Whitelist/WhitelistPropertySettings";
import { BooleanPropertySettings } from "src/Properties/Boolean/BooleanPropertySettings";


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
						this.onSubmit(this.result);
					}));
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}




}
