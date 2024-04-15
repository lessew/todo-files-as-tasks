import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, Settings } from 'src/core/FileAsTaskSettings';
import { ObsidianWrapper } from 'src/main/obsidian/ObsidianWrapper';
import {FATSettingTab} from "src/main/ui/FATSettingsTab"
import { MainCodeBlock } from 'src/main/MainCodeBlock';


export default class FATPlugin extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();
		ObsidianWrapper.init(this.app); 
		this.registerMarkdownCodeBlockProcessor("fat", (source, el, ctx) => {
			let block = new MainCodeBlock(source,el,this.settings,this.app);
			block.load();
		});
		this.addSettingTab(new FATSettingTab(this.app, this));
		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	// TODO analyse if we need to unload anything
	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

