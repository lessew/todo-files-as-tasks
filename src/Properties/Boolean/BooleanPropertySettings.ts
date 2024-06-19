import { PropertyDataType } from "src/Configuration/PluginSettings";
import { PropertySettings } from "../PropertySettings";
import { Whitelist } from "../Whitelist";

export class BooleanPropertySettings extends PropertySettings {
	private whitelist: Whitelist
	private defaultValue: string

	constructor(wl: Whitelist, df: string) {
		super();
		this.whitelist = wl;
		this.defaultValue = df;
		this.validateInit(wl);
	}

	validateInit(wl: Whitelist) {
		if (wl.size() != 2) {
			throw new Error(`Boolean field must have exactly 2 options but found "${wl.size()}"`);
		}
		return {
			whitelist: this.whitelist.toString(),
			type: "boolean"
		}
	}
	getDefaultValue(): string {
		return this.defaultValue;
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
