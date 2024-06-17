export abstract class PropertySettings {
	abstract getType(): string;
	abstract validate(newVal: string): boolean;
}


