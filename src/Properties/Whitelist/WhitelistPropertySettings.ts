import { Whitelist } from "../Whitelist";
import { PropertySettings } from "../PropertySettings";

export class WhitelistPropertySettings extends PropertySettings {
	private whitelist: Whitelist;
	private defaultValue: string;

	constructor(wl: Whitelist, df: string) {
		super();
		this.whitelist = wl;
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
}
