import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, View, parseFrontMatterAliases } from 'obsidian';
import { Main } from 'src/main/Main';
import {DEFAULT_SETTINGS, YatodoSettingTab} from "src/main/ui/SettingsTab"
import { TodoFATPluginSettings } from 'src/core/Interfaces/Settings';


export default class TodoFATPlugin extends Plugin {
	settings: TodoFATPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor("fat", (source, el, ctx) => {
			Main.run(source,el,this.settings,this.app);
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new YatodoSettingTab(this.app, this));

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

