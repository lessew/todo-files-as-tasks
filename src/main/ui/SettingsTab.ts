import YaTodoPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { YaTodoPluginSettings } from "src/core/Interfaces/Settings";


export const DEFAULT_SETTINGS: YaTodoPluginSettings = {
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
        containerEl.createEl("h1",{text:"Yatodo App"})
        //containerEl.createEl("hr");
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
                this.plugin.settings.contextValues = value;
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
                this.plugin.settings.statusValues = value;
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
                this.plugin.settings.starredValues = value;
                await this.plugin.saveSettings();
            }));
    }
}

