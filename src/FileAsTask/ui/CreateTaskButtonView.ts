import FileAsTaskPlugin from "main";
import { PathPropertyHelper } from "src/Properties/PathPropertyHelper";
import { PropertyViewFactory } from "src/Properties/PropertyViewFactory";
import { FileAsTaskModal } from "./FileAsTaskModal"

export class CreateTaskButtonView {
	root: string
	plugin: FileAsTaskPlugin;
	pathPropertyHelper: PathPropertyHelper;
	propertyViewFactory: PropertyViewFactory;

	constructor(root: string, plugin: FileAsTaskPlugin, pathPropertyHelper: PathPropertyHelper, pvf: PropertyViewFactory) {
		this.plugin = plugin;
		this.pathPropertyHelper = pathPropertyHelper;
		this.root = root;
		this.propertyViewFactory = pvf;
	}

	build(rootElement: HTMLElement): void {
		let a: HTMLElement = rootElement.createEl("a", { text: "new task" });
		a.addEventListener("click", this); // executes handleEvent
	}

	handleEvent(event: Event) {
		const m = new FileAsTaskModal(
			this.plugin.obsidianApp,
			this.plugin,
			this.plugin.pluginSettings,
			this.pathPropertyHelper,
			this.propertyViewFactory
		);
		m.open();
	}
}

