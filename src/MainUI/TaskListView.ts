import { PluginSettings } from "src/Configuration/PluginSettings";
import FileAsTaskPlugin from "main";
import { FileAsTaskCollection } from "src/FileAsTask/FileAsTaskCollection";
import { PropertySettings } from "src/Properties/PropertySettings";
import { LinkView } from "src/Properties/Link/LinkView";
import { TitlePropertyView } from "src/Properties/Title/TitlePropertyView";
import { WhitelistPropertyView } from "src/Properties/Whitelist/WhitelistPropertyView";
import { ProjectPropertyView } from "src/Properties/Project/ProjectPropertyView";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { BooleanPropertySettings } from "src/Properties/Boolean/BooleanPropertySettings";
import { BooleanPropertyView } from "src/Properties/Boolean/BooleanPropertyView";
import { WhitelistPropertySettings } from "src/Properties/Whitelist/WhitelistPropertySettings";
import { PathPropertyHelper } from "src/Properties/PathPropertyHelper";

export class TaskListView {
	fileAsTaskCollection: FileAsTaskCollection;
	rootElement: HTMLElement;
	plugin: FileAsTaskPlugin;
	pluginSettings: PluginSettings;
	pathPropertyHelper: PathPropertyHelper;

	constructor(fatc: FileAsTaskCollection, pluginSettings: PluginSettings, pathPropertyHelper: PathPropertyHelper, plugin: FileAsTaskPlugin) {
		this.plugin = plugin;
		this.fileAsTaskCollection = fatc;
		this.pluginSettings = pluginSettings;
		this.pathPropertyHelper = pathPropertyHelper;
	}

	build(rootElement: HTMLElement): HTMLElement {
		this.rootElement = rootElement;
		this.createTable(rootElement);
		return rootElement;
	}

	private createTable(parentElementToAttachTableTo: HTMLElement): void {
		let table: HTMLTableElement = parentElementToAttachTableTo.createEl("table", { cls: "yatodo" });
		this.createHeading(table);
		this.createRows(table);
	}

	private createHeading(tableElementToAttachHeadingTo: HTMLTableElement): void {
		let head: HTMLHeadingElement = tableElementToAttachHeadingTo.createEl("thead");
		head.createEl("th", { text: "Task" });
		head.createEl("th", { text: "Link" });
		head.createEl("th", { text: "Project" });
		head.createEl("th", { text: "Starred" });
		head.createEl("th", { text: "Context" });
		head.createEl("th", { text: "Status" });
	}

	private createRows(tableElementToAttachRowTo: HTMLTableElement) {
		let taskList = this.fileAsTaskCollection.get();
		for (let i = 0; i < taskList.length; i++) {
			const thisTask = taskList[i];
			let row: HTMLTableRowElement = tableElementToAttachRowTo.createEl("tr");
			this.titleView(row, thisTask);
			this.titleLinkView(row, thisTask);
			this.projectView(row, thisTask);
			this.yamlPropertiesView(row, thisTask);
		}
	}
	private titleView(row: HTMLTableRowElement, thisTask: FileAsTask): void {
		// title: not configurable
		let tdTitle = row.createEl("td", {});
		let tp = new TitlePropertyView(this.pathPropertyHelper, thisTask, this.plugin);
		tp.build(tdTitle);
	}

	private titleLinkView(row: HTMLTableRowElement, thisTask: FileAsTask): void {

		let tdTitleLink = row.createEl("td", {});
		const lv = new LinkView("link", thisTask);
		lv.build(tdTitleLink);
	}

	private projectView(row: HTMLTableRowElement, thisTask: FileAsTask): void {

		let tdProject: HTMLTableCellElement = row.createEl("td", {});
		const pp = new ProjectPropertyView(
			this.pathPropertyHelper,
			thisTask,
			this.plugin
		);
		pp.build(tdProject);
	}

	private yamlPropertiesView(row: HTMLTableRowElement, thisTask: FileAsTask): void {
		let props = this.plugin.pluginSettings.getPropertySettings();
		props.forEach((value, key) => {
			let prop = value as PropertySettings;
			if (prop.getType() == "boolean") {
				let tdCell: HTMLTableCellElement = row.createEl("td", {});
				let bprop = prop as BooleanPropertySettings;
				const ss = new BooleanPropertyView(key, bprop, thisTask, this.plugin)
				ss.build(tdCell);
			}
			else if (prop.getType() == "whitelist") {
				let tdCell: HTMLTableCellElement = row.createEl("td", {});
				let bprop = prop as WhitelistPropertySettings;
				const ss = new WhitelistPropertyView(key, bprop, thisTask, this.plugin)
				ss.build(tdCell);
			}
		})
	}
}
