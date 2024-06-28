import { FileAsTask } from "src/FileAsTask/FileAsTask";

export abstract class PropertyView {
	abstract build(fat: FileAsTask, rootElement: HTMLElement): void;
	abstract buildSettingsUI(): void;
	abstract buildCreateUI(el: HTMLElement, onchange: (value: string) => void): void;
}
