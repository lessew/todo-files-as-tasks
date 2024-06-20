import { PropertySettings } from "../../src/Properties/PropertySettings";
import { Whitelist } from "../../src/Properties/Whitelist";
import { WhitelistPropertySettings } from "../../src/Properties/Whitelist/WhitelistPropertySettings";
import { BooleanPropertySettings } from "../../src/Properties/Boolean/BooleanPropertySettings";

export type SavedSettingsDataType = {
	properties: PropertyDataType[];
};

export type PropertyDataType = {
	name: string,
	type: string,
	defaultValue: string,
	whitelist?: string[]
}

export class PluginSettings {
	propertySettings: Map<string, PropertySettings>;

	constructor() {
		this.propertySettings = new Map<string, PropertySettings>();
	}

	getPropertySettings(): Map<string, PropertySettings> {
		return this.propertySettings;
	}

	addYAMLproperty(propName: string, setting: PropertySettings): PluginSettings {
		this.propertySettings.set(propName, setting);
		return this;
	}

	getPropertySetting(propName: string): PropertySettings {
		let s = this.propertySettings.get(propName);
		if (s == undefined) {
			throw Error(`Setting does not exist ${propName}`)
		}
		return s;
	}

	load(fromData: any): PluginSettings {
		let parsedFrom = fromData as SavedSettingsDataType;

		parsedFrom.properties.forEach(aprop => {
			if (aprop.type == "whitelist") {
				this.addYAMLproperty(
					aprop.name,
					new WhitelistPropertySettings(
						new Whitelist(aprop.whitelist!),
						aprop.defaultValue
					)
				)
			}
			else if (aprop.type == "boolean") {
				this.addYAMLproperty(
					aprop.name,
					new BooleanPropertySettings(
						new Whitelist(aprop.whitelist!),
						aprop.defaultValue
					)
				)
			}
		});
		return this;
	}

	save(): SavedSettingsDataType {
		let dataProps: PropertyDataType[] = [];

		this.propertySettings.forEach((propSetting, propName) => {
			let apropData = propSetting.toData(propName);
			dataProps.push(apropData);
		})
		return { properties: dataProps } as SavedSettingsDataType;
	}

}





