import FileAsTaskPlugin from "main";
import { CodeBlock } from "src/CodeBlock";
import { TestView } from "./ui/TestView";

export class TestController {
	el: HTMLElement;
	plugin: FileAsTaskPlugin;
	testView: TestView;
	codeBlock: CodeBlock;

	constructor(plugin: FileAsTaskPlugin, cb: CodeBlock, el: HTMLElement) {
		this.el = el;
		this.plugin = plugin;
		this.testView = new TestView(this.plugin, cb, this.el);
	}

	build(): void {
		this.testView.main();
	}
}
