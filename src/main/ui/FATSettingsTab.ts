import FATPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { FATPluginSettings } from "src/core/Interfaces/FATPluginSettings";


export const DEFAULT_SETTINGS: FATPluginSettings = {
    contextValues: "Desk,Deep,Phone,Read,None",
    statusValues:"Inbox,Next,Deferred,Waiting,Done",
    starredValues: "✰,⭐"
}

export class FATSettingTab extends PluginSettingTab {
	plugin: FATPlugin;

	constructor(app: App, plugin: FATPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();
        containerEl.createEl("h1",{text:"Yatodo App"})
        this.setContextValues(containerEl);
        this.setStatusValues(containerEl);
        this.setStarredValues(containerEl);
	}

    setContextValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Context values')
        .setDesc('All allowed values for "context", comma seperated')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings.contextValues)
            .onChange(async (value) => {
                this.plugin.settings.contextValues = value.trim();
                await this.plugin.saveSettings();
            }));
    }

    setStatusValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Status values')
        .setDesc('All allowed values for "status", comma seperated')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings.statusValues)
            .onChange(async (value) => {
                this.plugin.settings.statusValues = value.trim();
                await this.plugin.saveSettings();
            }));
    }
    setStarredValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Starred values')
        .setDesc('All allowed values for "context", comma seperated')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings.starredValues)
            .onChange(async (value) => {
                this.plugin.settings.starredValues = value.trim();
                await this.plugin.saveSettings();
            }));
    }
}

