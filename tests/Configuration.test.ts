import { Configuration } from "../src/core/Configuration";
import { PluginSettings } from "../src/core/PluginSettings";
import { YAMLParser } from "../src/core/YAMLParser";



describe('Configuration test', () => {

    test('Test constructor', () => {   
        let p = new YAMLParser();
        let s = new PluginSettings();
        let c = new Configuration(p,s);
        expect(true).toBe(true);
    });
});