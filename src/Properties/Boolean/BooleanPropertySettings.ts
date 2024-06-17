import { PropertySettings } from "../PropertySettings";
import { Whitelist } from "../Whitelist";

export class BooleanPropertySettings extends PropertySettings {
	private whitelist: Whitelist
	private defaultValue: string

	constructor(wl: Whitelist, df: string) {
		super();
		this.validateInit(wl);
		this.whitelist = wl;
		this.defaultValue = df;
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
			// TODO: Handle console.erro;
			console.log("Error, value not recognized: " + currentValue)
			return this.defaultValue;
		}
	}

	validate(newVal: string): boolean {
		return newVal in this.whitelist.toArray();
	}
	getType(): string {
		return "boolean";

	}
}
