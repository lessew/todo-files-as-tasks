import FATPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { FATProperty, FATSettings } from "../FileAsTask";


export const DEFAULT_SETTINGS: FATSettings = {
    [FATProperty.context]:{
        allowedValues:["Desk","Deep","Phone","Read","None"],
        defaultValue:"None"
    },
    [FATProperty.status]:{
        allowedValues:["Inbox","Next","Deferred","Waiting","Done"],
        defaultValue:"Inbox"
    },
    [FATProperty.starred]:{
        allowedValues:["✰","⭐"],
        defaultValue:"✰"
    },
    [FATProperty.title]:{
        defaultValue:"no title"
    },
    [FATProperty.project]:{
        defaultValue:"no project"
    }
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
            .setValue(this.plugin.settings[FATProperty.context].allowedValues!.join(","))
            .onChange(async (value) => {
                this.plugin.settings[FATProperty.context].allowedValues = value.trim().split(",");
                await this.plugin.saveSettings();
            }));
    }

    setStatusValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Status values')
        .setDesc('All allowed values for "status", comma seperated')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings[FATProperty.status].allowedValues!.join(","))
            .onChange(async (value) => {
                this.plugin.settings[FATProperty.status].allowedValues = value.trim().split(",");
                await this.plugin.saveSettings();
            }));
    }
    setStarredValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Starred values')
        .setDesc('All allowed values for "context", comma seperated')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings[FATProperty.starred].allowedValues!.join(","))
            .onChange(async (value) => {
                this.plugin.settings[FATProperty.starred].allowedValues = value.trim().split(",");
                await this.plugin.saveSettings();
            }));
    }
}

