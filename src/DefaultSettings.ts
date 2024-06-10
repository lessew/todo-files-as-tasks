import { PluginSettings } from "./Configuration/PluginSettings";
import { BooleanStrategy, WhiteListStrategy } from "./FileAsTask/PropertyStrategies/YAMLStrategy";
import { Whitelist } from "./FileAsTask/PropertyStrategies/Whitelist";


export const DEFAULT_SETTINGS:PluginSettings = new PluginSettings()
    .add("starred","✰",new BooleanStrategy(new Whitelist(["✰", "⭐"])))
    .add("context","None", new WhiteListStrategy(new Whitelist(["Desk", "Deep", "Phone", "Read", "Errands", "None"])))
    .add("status","Inbox", new WhiteListStrategy(new Whitelist(["Inbox", "Next", "Deferred", "Waiting", "Done"])))
