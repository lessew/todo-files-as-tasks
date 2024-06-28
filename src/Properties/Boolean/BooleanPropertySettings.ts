import { PropertyDataType } from "src/Configuration/PluginSettings";
import { PropertySettings } from "../PropertySettings";
import { Whitelist } from "../Whitelist";

export class BooleanPropertySettings extends PropertySettings {
	private whitelist: Whitelist
	private defaultValue: string

	constructor(wl: string[], df: string) {
		super();
		this.defaultValue = df;
		this.whitelist = new Whitelist(wl);
		this.validateInit(wl);
	}

	validateInit(wl: string[]) {
		if (wl.length != 2) {
			throw new Error(`Boolean field must have exactly 2 options but found "${wl.length}"`);
		}
		return {
			whitelist: wl,
			type: "boolean"
		}
	}
	getDefaultValue(): string {
		return this.defaultValue;
	}

	getWhitelist(): Whitelist {
		return this.whitelist;
	}

	getNewToggleValue(currentValue: string): string {
		let a = this.whitelist.toArray();
		if (currentValue == a[0]) {
			return a[1];
		}
		else if (currentValue == a[1]) {
			return a[0];
		}
		else {
			throw new Error(`Error iin toggle, value not recognized ${currentValue}`)
		}
	}

	validate(newVal: string): boolean {
		return this.whitelist.toArray().includes(newVal);
	}

	getType(): string {
		return "boolean";

	}

	toData(propName: string): PropertyDataType {
		return {
			name: propName,
			type: "boolean",
			defaultValue: this.defaultValue,
			whitelist: this.whitelist.toArray()
		}
	}

}
