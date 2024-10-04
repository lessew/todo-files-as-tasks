import { BooleanPropertySettings } from "../../src/Properties/Boolean/BooleanPropertySettings";
import { WhitelistPropertySettings } from "../../src/Properties/Whitelist/WhitelistPropertySettings";
import { PropertySettings } from "../../src/Properties/PropertySettings";

export type SavedSettingsDataType = {
	properties: PropertyDataType[];
};

export type PropertyDataType = {
	name: string,
	type: string,
	defaultValue: string,
	whitelist?: string[]
}

const DEFAULT_PLUGIN_SETTINGS: SavedSettingsDataType = {
	properties: [
		{
			name: "starred",
			type: "boolean",
			defaultValue: "⭐",
			whitelist: ["✰", "⭐"]
		},
		{
			name: "context",
			type: "whitelist",
			defaultValue: "None",
			whitelist: ["Desk", "Deep", "Phone", "Read", "Outside", "Errands", "None"]
		},
		{
			name: "status",
			type: "whitelist",
			defaultValue: "Inbox",
			whitelist: ["Inbox", "Next", "Deferred", "Waiting", "Done"]
		}
	] as PropertyDataType[]
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

	loadDefaultSettings(): PluginSettings | Error {
		return this.load(DEFAULT_PLUGIN_SETTINGS);
	}

	private validateLoad(fromData: any): fromData is SavedSettingsDataType {
		let result = true;
		if (typeof fromData === 'undefined') {
			return false;
		}
		if (fromData == null) {
			return false;
		}
		if (!('properties' in fromData)) {
			return false;
		}
		if (!Array.isArray(fromData.properties)) {
			return false;
		}
		fromData.properties.forEach((aprop: any) => {
			if (!('type' in aprop)) {
				result = false;
				return;
			}
			if (!('name' in aprop)) {
				result = false;
				return;
			}
			if (!('defaultValue' in aprop)) {
				result = false;
				return;
			}
			return result;
		});
		return result;
	}

	load(fromData: any): PluginSettings | Error {
		if (!(this.validateLoad(fromData))) {
			return new Error(`Trying to load data that is not compatible`)
		}

		let parsedFrom = fromData as SavedSettingsDataType;

		parsedFrom.properties.forEach(aprop => {
			if (aprop.type == "whitelist") {
				this.addYAMLproperty(
					aprop.name,
					new WhitelistPropertySettings(
						aprop.whitelist!,
						aprop.defaultValue
					)
				)
			}
			else if (aprop.type == "boolean") {
				this.addYAMLproperty(
					aprop.name,
					new BooleanPropertySettings(
						aprop.whitelist!,
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





