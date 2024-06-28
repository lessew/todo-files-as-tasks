import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { PropertyView } from "../PropertyView";

export class LinkView extends PropertyView {
	linkText: string;
	href: string;
	fat: FileAsTask;

	constructor(linkText: string) {
		super();
		this.linkText = linkText;
	}

	build(fat: FileAsTask, rootElement: HTMLElement): void {

		this.href = fat.getLink();
		let title: HTMLElement = rootElement.createEl("a",
			{
				text: this.linkText,
				href: this.href,
				cls: "internal-link",
				attr: {
					target: "_blank",
					["data-href"]: this.href
				}
			}
		);

	}

	buildCreateUI(el: HTMLElement, onchange: (value: string) => void): void {
		// tbi
	}
	buildSettingsUI(): void {
		// tbi
	}
}
