import FATPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";


export class FATSettingTab extends PluginSettingTab {
	plugin: FATPlugin;

	constructor(app: App, plugin: FATPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();
        containerEl.createEl("h1",{text:"Files As Tasks: Treat each file as a single task"})
        this.setContextValues(containerEl);
        this.setStatusValues(containerEl);
        this.setStarredValues(containerEl);
	}

    setContextValues(containerEl:HTMLElement):void{
        let propSettings = this.plugin.settings.get("context");
        let values = propSettings.whitelist!.joinByComma();
        
        new Setting(containerEl)
        .setName('Context values')
        .setDesc('All allowed values for "context", comma seperated')
        .setClass("file-as-task")
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(values)
            .onChange(async (value: string) => {
                propSettings.whitelist!.setByStringSeperatedByComma(value);
                await this.plugin.saveSettings();
            }));
    }

    setStatusValues(containerEl:HTMLElement):void{
        let propSettings = this.plugin.settings.get("status");

        new Setting(containerEl)
        .setName('Status values')
        .setDesc('All allowed values for "status", comma seperated')
        .setClass("file-as-task")
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(propSettings.whitelist!.joinByComma())
            .onChange(async (value) => {
                propSettings.whitelist!.setByStringSeperatedByComma(value);
                await this.plugin.saveSettings();
            }));
    }

    setStarredValues(containerEl:HTMLElement):void{
        let propSettings = this.plugin.settings.get("starred");

        new Setting(containerEl)
        .setName('Starred values')
        .setClass("file-as-task")
        .setDesc('All allowed values for "context", comma seperated')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(propSettings.whitelist!.joinByComma())
            .onChange(async (value) => {
                propSettings.whitelist!.setByStringSeperatedByComma(value);
                await this.plugin.saveSettings();
            }));
    }
}

