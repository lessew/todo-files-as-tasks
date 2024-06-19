import { PropertyDataType } from "src/Configuration/PluginSettings";

export abstract class PropertySettings {
	abstract getType(): string;
	abstract validate(newVal: string): boolean;
	abstract toData(propName: string): PropertyDataType;
}


