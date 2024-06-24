import FileAsTaskPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { BooleanPropertySettings } from "src/Properties/Boolean/BooleanPropertySettings";
import { PropertySettings } from "src/Properties/PropertySettings";
import { PluginSettings } from "../PluginSettings";


export class FATSettingTab extends PluginSettingTab {
	plugin: FileAsTaskPlugin;

	constructor(app: App, plugin: FileAsTaskPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h1", { text: "Files As Tasks: Treat each file as a single task" })

		// TODO use iterator, add custom fields
		let settings: PluginSettings = this.plugin.pluginSettings;

		settings.getPropertySettings().forEach((aprop, key) => {
			if (aprop.getType() == 'boolean') {
				this.setBooleanSettings(key, aprop, containerEl);
			}
			else if (aprop.getType() == 'whitelist') {
				this.setWhitelistSettings(key, aprop, containerEl);
			}
		})

	}

	setBooleanSettings(name: string, aprop: PropertySettings, containerEl: HTMLElement): void {
		let bps = aprop as BooleanPropertySettings;
		new Setting(containerEl)
			.setName(name)
			.setClass('file-as-task')
			.addText(text => text
				.setValue(bps.toData(name).whitelist!.join(","))
			)
	}

	setWhitelistSettings(name: string, aprop: PropertySettings, containerEl: HTMLElement): void {

		let bps = aprop as BooleanPropertySettings;
		new Setting(containerEl)
			.setName(name)
			.setClass('file-as-task')
			.addText(text => text
				.setValue(bps.toData(name).whitelist!.join(","))
			)
	}

	/*
		setContextValues(containerEl: HTMLElement): void {
			let propSettings = this.plugin.pluginSettings.get("context");
			let values = propSettings.whitelist!.joinByComma();
	
			new Setting(containerEl)
				.setName('Context values')
				.setDesc('All allowed values for "context", comma seperated')
				.setClass("file-as-task")
				.addText(text => text
					.setPlaceholder('Enter values')
					.setValue(values)
					.onChange(async (value: string) => {
						propSettings.whitelist!.setByStringSeperatedByComma(value);
						await this.plugin.saveSettings();
					}));
		}
	
		setStatusValues(containerEl: HTMLElement): void {
			let propSettings = this.plugin.pluginSettings.get("status");
	
			new Setting(containerEl)
				.setName('Status values')
				.setDesc('All allowed values for "status", comma seperated')
				.setClass("file-as-task")
				.addText(text => text
					.setPlaceholder('Enter values')
					.setValue(propSettings.whitelist!.joinByComma())
					.onChange(async (value) => {
						propSettings.whitelist!.setByStringSeperatedByComma(value);
						await this.plugin.saveSettings();
					}));
		}
	
		setStarredValues(containerEl: HTMLElement): void {
			let propSettings = this.plugin.pluginSettings.get("starred");
	
			new Setting(containerEl)
				.setName('Starred values')
				.setClass("file-as-task")
				.setDesc('All allowed values for "context", comma seperated')
				.addText(text => text
					.setPlaceholder('Enter values')
					.setValue(propSettings.whitelist!.joinByComma())
					.onChange(async (value) => {
						propSettings.whitelist!.setByStringSeperatedByComma(value);
						await this.plugin.saveSettings();
					}));
			
		}
		*/
}

