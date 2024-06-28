import { PluginSettings } from "src/Configuration/PluginSettings";
import FileAsTaskPlugin from "main";
import { FileAsTaskCollection } from "src/FileAsTask/FileAsTaskCollection";
import { PropertySettings } from "src/Properties/PropertySettings";
import { LinkView } from "src/Properties/Link/LinkView";
import { TitlePropertyView } from "src/Properties/Title/TitlePropertyView";
import { ProjectPropertyView } from "src/Properties/Project/ProjectPropertyView";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { PathPropertyHelper } from "src/Properties/PathPropertyHelper";
import { PropertyViewFactory } from "src/Properties/PropertyViewFactory";

export class TaskListView {
	fileAsTaskCollection: FileAsTaskCollection;
	rootElement: HTMLElement;
	plugin: FileAsTaskPlugin;
	pluginSettings: PluginSettings;
	pathPropertyHelper: PathPropertyHelper;
	propertyViewFactory: PropertyViewFactory

	constructor(
		fatc: FileAsTaskCollection,
		pluginSettings: PluginSettings,
		pathPropertyHelper: PathPropertyHelper,
		plugin: FileAsTaskPlugin,
		pvf: PropertyViewFactory
	) {
		this.plugin = plugin;
		this.fileAsTaskCollection = fatc;
		this.pluginSettings = pluginSettings;
		this.pathPropertyHelper = pathPropertyHelper;
		this.propertyViewFactory = pvf
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
		let tp = new TitlePropertyView(this.pathPropertyHelper, this.plugin);
		tp.build(thisTask, tdTitle);
	}
	private titleLinkView(row: HTMLTableRowElement, thisTask: FileAsTask): void {

		let tdTitleLink = row.createEl("td", {});
		const lv = new LinkView("link");
		lv.build(thisTask, tdTitleLink);
	}

	private projectView(row: HTMLTableRowElement, thisTask: FileAsTask): void {

		let tdProject: HTMLTableCellElement = row.createEl("td", {});
		const pp = new ProjectPropertyView(
			this.pathPropertyHelper,
			this.plugin
		);
		pp.build(thisTask, tdProject);
	}
	private yamlPropertiesView(row: HTMLTableRowElement, thisTask: FileAsTask): void {
		let props = this.pluginSettings.propertySettings;
		props.forEach((value, key) => {
			let prop = value as PropertySettings;
			let tdCell: HTMLTableCellElement = row.createEl("td", {});
			let view = this.propertyViewFactory.createPropertyView(key, prop, this.plugin);
			view.build(thisTask, tdCell);
		})
	}
}
