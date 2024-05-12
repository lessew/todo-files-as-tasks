import { PluginSettings } from "./PluginSettings";
import { YAMLParser } from "./YAMLParser";

export class Configuration{
    private parser:YAMLParser;
    private settings:PluginSettings;

    constructor(p:YAMLParser,s:PluginSettings){
        this.parser = p;
        this.settings = s;
    }
}