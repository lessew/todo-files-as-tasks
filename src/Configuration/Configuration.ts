import { PathPropertyHelper } from "../../src/Properties/PathPropertyHelper";
import { PropertySettings } from "../../src/Properties/PropertySettings";
import { Filter } from "../FileAsTask/Filter";
import { PluginSettings } from "./PluginSettings";
import { CodeBlockParser } from "./CodeBlockParser";

export class Configuration {
	private parser: CodeBlockParser;
	private settings: PluginSettings;
	private state: Error | true;
	private rootPath: string;
	private filters: Filter[];
	private action: string;
	private pathPropertyHelper: PathPropertyHelper;

	constructor() {
		this.state = true;
	}

	loadSource(source: string): void {
		if (this.stateIsError()) {
			return;
		}
		this.parser = new CodeBlockParser();
		this.state = this.parser.loadSource(source);
	}

	loadPathPropertyHelper(directories: string[]): void {
		if (this.stateIsError()) {
			return;
		}
		this.pathPropertyHelper = new PathPropertyHelper(directories, 0);
	}

	loadSettings(settings: PluginSettings): void {
		if (this.stateIsError()) {
			return;
		}
		this.settings = settings;
	}

	getYAMLStrategies(): Map<string, PropertySettings> {
		return this.settings.propertySettings;
	}


	loadRootPath(): void {
		if (this.stateIsError()) {
			return;
		}
		let result = this.parser.parseRootPath();
		if (result instanceof Error) {
			this.state = result;
		}
		else {
			this.rootPath = result;
		}
	}

	loadFilters(): void {
		if (this.stateIsError()) {
			return;
		}
		let result = this.parser.parseFilters(this.settings);
		if (result instanceof Error) {
			this.state = result;
		}
		else {
			this.filters = result;
		}
	}

	loadAction(): void {
		if (this.stateIsError()) {
			return;
		}
		let action = this.parser.parseAction();
		if (action instanceof Error) {
			this.state = action;
		}
		else {
			this.action = action;
		}
	}

	getAction(): string {
		return this.action;
	}

	getSettings(): PluginSettings {
		return this.settings;
	}

	getPathPropertyHelper(): PathPropertyHelper {
		return this.pathPropertyHelper;
	}

	getRootPath(): string {
		return this.rootPath;
	}

	getFilters(): Filter[] {
		return this.filters;
	}

	getErrorState(): Error {
		if (this.state == true) {
			return Error("Error state requested but no error was set");
		}
		else {
			return this.state;
		}
	}

	stateIsError(): boolean {
		return this.state != true;
	}
}
