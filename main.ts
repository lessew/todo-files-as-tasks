import { App, Plugin } from 'obsidian';
import { CodeBlock } from 'src/CodeBlock';
import { PluginSettings } from 'src/Configuration/PluginSettings';
import { SettingsModel } from 'src/Configuration/SettingsModel';
import { FATSettingTab } from 'src/Configuration/ui/FATSettingsTab';
import { ObsidianFacade } from 'src/FileSystem/obsidian/ObsidianFacade';

export default class FileAsTaskPlugin extends Plugin {
	pluginSettings:PluginSettings;
	codeBlocks:CodeBlock[] = [];
	obsidianFacade:ObsidianFacade;
	obsidianApp:App;

	async onload() {
		let jsonSettings = await this.loadData();
		this.pluginSettings = SettingsModel.loadDeepCopy(jsonSettings)
		this.obsidianFacade = new ObsidianFacade(this.app);
		this.obsidianApp = this.app;

		this.registerMarkdownCodeBlockProcessor("fat", async (source, el, ctx) => {
			let block = new CodeBlock(source, el, this);
			this.codeBlocks.push(block);
			await block.load();
		});

		this.addSettingTab(new FATSettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

    async reload():Promise<void>{
        await this.delay(150);
        for(let i=0;i<this.codeBlocks.length;i++){
            await this.codeBlocks[i].reload();
        }
    }

    delay(ms:number){
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
	
	async saveSettings() {
		await this.saveData(SettingsModel.deepCopy(this.pluginSettings));
	}
}

