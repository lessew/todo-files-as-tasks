import { Whitelist } from "src/Properties/Whitelist";
import { PluginSettings } from "./PluginSettings";
import { BooleanPropertySettings } from "../Properties/Boolean/BooleanPropertySettings"
import { WhitelistPropertySettings } from "src/Properties/Whitelist/WhitelistPropertySettings";

export const DEFAULT_SETTINGS: PluginSettings = new PluginSettings()
	.addYAMLproperty(
		"starred",
		new BooleanPropertySettings(
			new Whitelist(["✰", "⭐"]),
			"✰"
		)
	)
	.addYAMLproperty(
		"context",
		new WhitelistPropertySettings(
			new Whitelist(["Desk", "Deep", "Phone", "Read", "Errands", "None"]),
			"None"
		)
	)
	.addYAMLproperty(
		"status",
		new WhitelistPropertySettings(
			new Whitelist(["Inbox", "Next", "Deferred", "Waiting", "Done"]),
			"Inbox"
		)
	)
