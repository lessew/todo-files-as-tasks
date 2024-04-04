import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, View, parseFrontMatterAliases } from 'obsidian';
import { DEFAULT_SETTINGS, FATSettings } from 'src/main/FileAsTaskSettings';
import { Main } from 'src/main/Main';
import {FATSettingTab} from "src/main/ui/FATSettingsTab"


export default class FATPlugin extends Plugin {
	settings: FATSettings;

	async onload() {
		await this.loadSettings();
		
		this.registerMarkdownCodeBlockProcessor("fat", (source, el, ctx) => {
			let main = new Main(source,el,this.settings,this.app);
			main.load();
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new FATSettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));

		/*
		this.app.workspace.on('editor-change',(editor,info)=>{
			Main.run(source,el,this.settings,this.app);
            console.log("editor changed called");
            console.log(editor);
            console.log(info);
        })
		*/
		
        
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

