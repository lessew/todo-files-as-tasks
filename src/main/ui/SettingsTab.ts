import YaTodoPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface YaTodoPluginSettings {
	mySetting: string;
    contextValues:string;
    statusValues:string;
    starredValues:string;
}

export const DEFAULT_SETTINGS: YaTodoPluginSettings = {
	mySetting: 'default',
    contextValues: "Desk, Deep, Phone, Read, None",
    statusValues:"Inbox, Next, Deferred, Waiting, Done",
    starredValues: "⭐,✰"
}

export class YatodoSettingTab extends PluginSettingTab {
	plugin: YaTodoPlugin;

	constructor(app: App, plugin: YaTodoPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		this.setSetting(containerEl);
        this.setContextValues(containerEl);
        this.setStatusValues(containerEl);
        this.setStarredValues(containerEl);
	}

    setSetting(containerEl:HTMLElement):void{
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

    setContextValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Context values')
        .setDesc('All valid values the context property may have')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings.contextValues)
            .onChange(async (value) => {
                this.plugin.settings.contextValues = value;
                await this.plugin.saveSettings();
            }));
    }

    setStatusValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Status values')
        .setDesc('All valid values the status property may have')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings.statusValues)
            .onChange(async (value) => {
                this.plugin.settings.statusValues = value;
                await this.plugin.saveSettings();
            }));
    }
    setStarredValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Starred values')
        .setDesc('All valid values the status property may have')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings.starredValues)
            .onChange(async (value) => {
                this.plugin.settings.starredValues = value;
                await this.plugin.saveSettings();
            }));
    }
}
