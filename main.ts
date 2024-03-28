import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, View, parseFrontMatterAliases } from 'obsidian';
import { Main } from 'src/main/Main';
import {DEFAULT_SETTINGS, FATSettingTab} from "src/main/ui/FATSettingsTab"
import { FATPluginSettings } from 'src/core/Interfaces/FATPluginSettings';


export default class FATPlugin extends Plugin {
	settings: FATPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor("fat", (source, el, ctx) => {
			Main.run(source,el,this.settings,this.app);
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new FATSettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

