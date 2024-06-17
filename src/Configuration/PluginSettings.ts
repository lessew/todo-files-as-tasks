import { PropertySettings } from "src/Properties/PropertySettings";

export type SavedProp = {
	propName: string,
	defaultValue: string,
	whitelist?: string[],
	strategy: string
}

export type SavedSettings = {
	properties: SavedProp[]
}

/**
 * Include saveto and loadfrom to load/save to persistent obsidian storage
 * Defaultvalues are kept seperate from the strategies to keep them clean / functional / relatively stateless
 * 
 */
export class PluginSettings {

	propertySettings: Map<string, PropertySettings>;

	constructor() {
		this.propertySettings = new Map<string, PropertySettings>();
	}

	getPropertySettings(): Map<string, PropertySettings> {
		return this.propertySettings;
	}

	addYAMLproperty(propName: string, strategy: PropertySettings): PluginSettings {
		this.propertySettings.set(propName, strategy);
		return this;
	}

	getPropertySetting(propName: string): PropertySettings {
		let s = this.propertySettings.get(propName);
		if (s == undefined) {
			throw Error(`Setting does not exist ${propName}`)
		}
		return s;
	}

	toJSON(): string {
		let result: SavedProp[] = [];
		/*
				this.propertySettings.forEach((key, value) => {
					let propSet: SavedProp = {
						propName: key,
						defaultValue: this.propertyDefaults.get(key)!,
						strategy: value
					}
					result.push(propSet);
				})
		
				return JSON.stringify({ properties: result });
		*/
		return "";
	}

	fromJSON(inputStr: string): void {
		/*
		let input = JSON.parse(inputStr);
		let properties = input.properties as SavedProp[];
		properties.forEach((aProp) => {
			this.addYAMLproperty(aProp.propName, aProp.defaultValue, aProp.strategy)
		});
		*/
	}
	/*
		getDefault(propName: string): string {
			return this.propertyDefaults.get(propName)!;
		}
		*/
}





