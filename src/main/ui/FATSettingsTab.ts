import FATPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";
import { PROPERTYNAMES} from "../../core/FileAsTaskSettings";


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
            .setValue(this.plugin.settings[PROPERTYNAMES.context].whitelist!.joinByComma())
            .onChange(async (value) => {
                this.plugin.settings[PROPERTYNAMES.context].whitelist!.setByStringSeperatedByComma(value);;
                await this.plugin.saveSettings();
            }));
    }

    setStatusValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Status values')
        .setDesc('All allowed values for "status", comma seperated')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings[PROPERTYNAMES.status].whitelist!.joinByComma())
            .onChange(async (value) => {
                this.plugin.settings[PROPERTYNAMES.status].whitelist!.setByStringSeperatedByComma(value);
                await this.plugin.saveSettings();
            }));
    }
    setStarredValues(containerEl:HTMLElement):void{
        new Setting(containerEl)
        .setName('Starred values')
        .setDesc('All allowed values for "context", comma seperated')
        .addText(text => text
            .setPlaceholder('Enter values')
            .setValue(this.plugin.settings[PROPERTYNAMES.starred].whitelist!.joinByComma())
            .onChange(async (value) => {
                this.plugin.settings[PROPERTYNAMES.starred].whitelist!.setByStringSeperatedByComma(value);
                await this.plugin.saveSettings();
            }));
    }
}

