import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, Settings } from 'src/core/Settings';
import { ObsidianWrapper } from 'src/main/obsidian/ObsidianWrapper';
import {FATSettingTab} from "src/main/ui/FATSettingsTab"
import { MainCodeBlock } from 'src/main/MainCodeBlock';
import { SettingsModel } from 'src/core/SettingsModel';
import { CreateTaskModal } from 'src/main/ui/CreateTaskButtonView';
import { createFileAsTask } from "src/main/obsidian/CreateFileAsTask";

export default class FileAsTaskPlugin extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();
		ObsidianWrapper.init(this.app);
	
		// TODO find a way to create a file using button, how to handle rootPath?
		const ribbon = this.addRibbonIcon('dice','Files as Task', (evt: MouseEvent) => {
			let settings = new Settings();
        	const m:CreateTaskModal =  new CreateTaskModal(this.app,this.settings,async (result:Record<string,string>) => {
         		await createFileAsTask("todo-home/",result,this.settings);
          		ObsidianWrapper.getInstance().reload();
        		});
				m.open();
		});
		
		this.registerMarkdownCodeBlockProcessor("fat", async (source, el, ctx) => {
			let block = new MainCodeBlock(source,el,this.settings,this.app);
			await block.load();
		});
		this.addSettingTab(new FATSettingTab(this.app, this));
		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	// TODO analyse if we need to unload anything
	onunload() {

	}

	async loadSettings() {
		//this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		let savedSettings = await this.loadData();
		this.settings = SettingsModel.loadDeepCopy(savedSettings);
	}

	async saveSettings() {
		await this.saveData(SettingsModel.deepCopy(this.settings));
	}
}

