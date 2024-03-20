import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, View, parseFrontMatterAliases } from 'obsidian';
import { Main } from 'src/main/Main';
import {DEFAULT_SETTINGS, YatodoSettingTab} from "src/main/ui/SettingsTab"
import { YaTodoPluginSettings } from 'src/core/Interfaces/Settings';


export default class YaTodoPlugin extends Plugin {
	settings: YaTodoPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor("yatodo", (source, el, ctx) => {
			Main.run(source,el,this.settings,this.app);
		});

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				//new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				//console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
	

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new YatodoSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			//console.log('click', evt);
		});


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

