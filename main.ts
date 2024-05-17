import { App, Plugin } from 'obsidian';
import { PluginSettings } from 'src/core/Configuration/PluginSettings';
import { SettingsModel } from 'src/core/Configuration/SettingsModel';
import { FATSettingTab } from 'src/core/Configuration/ui/FATSettingsTab';
import { ObsidianFacade } from 'src/core/FileSystem/obsidian/ObsidianFacade';
import { CodeBlock } from 'src/main/CodeBlock';

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

		// TODO find a way to create a file using button, how to handle rootPath?
		//const ribbon = this.addRibbonIcon('dice','Files as Task', (evt: MouseEvent) => {
		//	let settings = new PluginSettings();
		//    	const m:CreateTaskModal =  new CreateTaskModal(this.app,this.settings,async (result:Record<string,string>) => {
		//   		await createFileAsTask("todo-home/",result,this.settings);
		//  		ObsidianWrapper.getInstance().reload();
		//});
		//		m.open();
		//});

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

