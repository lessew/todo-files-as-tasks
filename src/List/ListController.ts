import FileAsTaskPlugin from "main";
import { PluginSettings } from "src/Configuration/PluginSettings";
import { PathPropertyHelper } from "src/Properties/PathPropertyHelper";
import { PropertyViewFactory } from "src/Properties/PropertyViewFactory";
import { FileAsTaskCollection } from "./FileAsTaskCollection";
import { TaskListView } from "./ui/TaskListView";

export class ListController {
	view: TaskListView;

	constructor(
		fatc: FileAsTaskCollection,
		pluginSettings: PluginSettings,
		pathPropertyHelper: PathPropertyHelper,
		plugin: FileAsTaskPlugin,
		pvf: PropertyViewFactory
	) {
		this.view = new TaskListView(
			fatc,
			pluginSettings,
			pathPropertyHelper,
			plugin,
			pvf
		);
	}

	build(el: HTMLElement) {
		this.view.build(el);
	}
}
