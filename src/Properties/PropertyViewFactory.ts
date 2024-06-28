
// this class exists so that the obsidian code can be seperated from the testable code

import FileAsTaskPlugin from "main";
import { FileAsTask } from "src/FileAsTask/FileAsTask";
import { BooleanPropertyView } from "./Boolean/BooleanPropertyView";
import { PropertySettings } from "./PropertySettings";
import { PropertyView } from "./PropertyView";
import { WhitelistPropertyView } from "./Whitelist/WhitelistPropertyView";

// as the view classes contain modals and other obsidian helper functions
export abstract class PropertyViewFactory {
	abstract createPropertyView(
		propName: string,
		propSettings: PropertySettings,
		task: FileAsTask,
		plugin: FileAsTaskPlugin
	): PropertyView;
}

export class ObsidianPropertyViewFactory extends PropertyViewFactory {
	createPropertyView(
		propName: string,
		propSettings: PropertySettings,
		task: FileAsTask,
		plugin: FileAsTaskPlugin): PropertyView {

		let v: PropertyView;
		if (propSettings.getType() == "whitelist") {
			v = new WhitelistPropertyView(
				propName,
				propSettings,
				task,
				plugin);
		}
		else if (propSettings.getType() == "boolean") {
			v = new BooleanPropertyView(
				propName,
				propSettings,
				task,
				plugin);
		}
		else {
			throw new Error(`Type ${propSettings.getType()} not recognized`)
		}
		return v;
	};
}
