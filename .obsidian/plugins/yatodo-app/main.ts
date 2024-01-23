import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import {CodeBlockProcessor} from 'src/CodeBlockProcessor';
// Remember to rename these classes and interfaces!

interface YaTodoPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: YaTodoPluginSettings = {
	mySetting: 'default'
}

const ALL_EMOJIS: Record<string, string> = {
	":+1:": "👍",
	":sunglasses:": "😎",
	":smile:": "😄",
  };


export default class YaTodoPlugin extends Plugin {
	settings: YaTodoPluginSettings;

	async onload() {
		await this.loadSettings();


		this.registerMarkdownPostProcessor((element, context) => {
			const codeblocks = element.findAll("yatodo");
	  
			for (let codeblock of codeblocks) {
			  const text = codeblock.innerText.trim();
			  if (text[0] === ":" && text[text.length - 1] === ":") {
				const emojiEl = codeblock.createSpan({
				  text: ALL_EMOJIS[text] ?? text,
				});
				codeblock.replaceWith(emojiEl);
			  }
			}
		  });

		  this.registerMarkdownCodeBlockProcessor("yatodo", (source, el, ctx) => {
			CodeBlockProcessor.process(source,el);
		
		});

		  this.registerMarkdownCodeBlockProcessor("csv", (source, el, ctx) => {
			const rows = source.split("\n").filter((row) => row.length > 0);
	  
			const table = el.createEl("table");
			const body = table.createEl("tbody");
	  
			for (let i = 0; i < rows.length; i++) {
			  const cols = rows[i].split(",");
	  
			  const row = body.createEl("tr");
	  
			  for (let j = 0; j < cols.length; j++) {
				row.createEl("td", { text: cols[j] });
			  }
			}
		  });

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This is a notice2!');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new YatodoSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		this.addRibbonIcon('dice', 'Greet', () => {
			new Notice('Hello, worldzords!');
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

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class YatodoSettingTab extends PluginSettingTab {
	plugin: YaTodoPlugin;

	constructor(app: App, plugin: YaTodoPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
