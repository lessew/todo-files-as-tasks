import { Whitelist } from "../Whitelist";
import { PropertySettings } from "../PropertySettings";
import { PropertyDataType } from "src/Configuration/PluginSettings";

export class WhitelistPropertySettings extends PropertySettings {
	private whitelist: Whitelist;
	private defaultValue: string;

	constructor(wl: string[], df: string) {
		super();
		this.whitelist = new Whitelist(wl);
		this.defaultValue = df;
	}

	validate(newValue: string): boolean {
		return this.whitelist.toArray().includes(newValue);
	}

	getWhitelist(): Whitelist {
		return this.whitelist;
	}

	getDefaultValue(): string {
		return this.defaultValue;
	}

	getType(): string {
		return "whitelist";
	}

	toData(propName: string): PropertyDataType {
		return {
			name: propName,
			type: "whitelist",
			defaultValue: this.defaultValue,
			whitelist: this.whitelist.toArray()
		}
	}
}
