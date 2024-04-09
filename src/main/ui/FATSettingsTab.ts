import FATPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { FATPROPERTY} from "../FileAsTaskSettings";


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
            .setValue(this.plugin.settings[FATPROPERTY.context].allowedValues!.join(","))
            .onChange(async (value) => {
                this.plugin.settings[FATPROPERTY.context].allowedValues = value.trim().split(",");
                await this.plugin.saveSettings();
            }));
    }

    setStatusValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Status values')
        .setDesc('All allowed values for "status", comma seperated')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings[FATPROPERTY.status].allowedValues!.join(","))
            .onChange(async (value) => {
                this.plugin.settings[FATPROPERTY.status].allowedValues = value.trim().split(",");
                await this.plugin.saveSettings();
            }));
    }
    setStarredValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Starred values')
        .setDesc('All allowed values for "context", comma seperated')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings[FATPROPERTY.starred].allowedValues!.join(","))
            .onChange(async (value) => {
                this.plugin.settings[FATPROPERTY.starred].allowedValues = value.trim().split(",");
                await this.plugin.saveSettings();
            }));
    }
}

