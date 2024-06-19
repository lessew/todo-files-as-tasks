import * as yaml from 'js-yaml'
import { PropertySettings } from 'src/Properties/PropertySettings';
import { Filter, FilterOperator } from '../FileAsTask/Filter';
import { PluginSettings } from './PluginSettings';

// TODO : use Obsidian YAML parser functions
export class CodeBlockParser {
	source: string;
	yaml: unknown;
	// TODO: prepend all with TOKEN_
	static ACTION_LIST = "list";
	static ACTION_CREATE_BUTTON = "create_button";
	static ACTION_TEST = "test"
	static EXCLUDE_TOKEN = "not ";
	static TOKEN_ROOTPATH = "rootPath" as const;

	loadSource(source: string): true | Error {
		this.source = source;
		try {
			this.yaml = yaml.load(source);
			return true;
		}
		catch (e) {
			return new Error(`Error: not valid YAML: ${e.message}`);
		}
	}

	parseRootPath(): string | Error {
		try {
			const rp: string = (this.yaml as { [CodeBlockParser.TOKEN_ROOTPATH]: string }).rootPath;
			return rp;
		}
		catch (e) {
			return new Error("Could not parse rootpath: yaml variable not found")
		}
	}

	parseAction(): string | Error {
		if (this.source.indexOf(CodeBlockParser.ACTION_CREATE_BUTTON) > -1) {
			return CodeBlockParser.ACTION_CREATE_BUTTON;
		}
		else if (this.source.indexOf(CodeBlockParser.ACTION_LIST) > -1) {
			return CodeBlockParser.ACTION_LIST;
		}
		else if (this.source.indexOf(CodeBlockParser.ACTION_TEST) > -1) {
			return CodeBlockParser.ACTION_TEST;
		}
		else {
			return new Error("Action not specified, add either 'list' or 'create_button'")
		}
	}


	parseFilters(settings: PluginSettings): Filter[] | Error {
		let result: Filter[] = [];
		let yaml = this.yaml as any;

		let statusIsError = false;
		let err = new Error("dummy");

		settings.propertySettings.forEach((propSettings: PropertySettings, key: string) => {
			if (!(key in yaml)) {
				return;
			}
			let [operator, needle] = this.parseOperator(yaml[key]);

			if (propSettings.validate(needle)) {
				let f = new Filter(key, needle, operator);
				result.push(f);
			}
			else {
				err = new Error(`Value ${needle} is not allowed for property ${key}`)
				statusIsError = true;
			}
		});
		return !statusIsError ? result : err;
	}

	// val: 'not <value>' or '<value>'
	parseOperator(val: string): [FilterOperator, string] {
		let operator = FilterOperator.include;
		let resultValue = val;
		if (val.startsWith(CodeBlockParser.EXCLUDE_TOKEN)) {
			operator = FilterOperator.exclude
			resultValue = val.substring(CodeBlockParser.EXCLUDE_TOKEN.length, val.length).trim();
		}
		return [operator, resultValue.trim()]
	}
}

