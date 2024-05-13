import { SettingsModel, SettingsSavedFormatType } from "src/core/SettingsModel";
import { Configuration } from "../src/core/Configuration";
import { PluginSettings } from "../src/core/PluginSettings";
import { YAMLParser } from "../src/core/YAMLParser";
import { Whitelist } from "src/core/Whitelist";

let yaml=`rootPath: Todo

`;

describe('Configuration test', () => {
    let yaml:string =``;

    let testConfig:SettingsSavedFormatType = {
        properties: [{
        propName:"title",
        defaultValue:"default",
        type:"basename"
    },
    {
        propName:"status",
        defaultValue:"Next",
        whitelist:["Inbox","Next"],
        type:"whitelistYAML"
    } ]
}

    test('Test for errors', () => {   
        let p = new YAMLParser();
        p.loadSource(yaml);
        let s = SettingsModel.loadDeepCopy(testConfig);
        let c = new Configuration();
        let resultYAML = c.loadSource(yaml);
        let resultSettings = c.loadSettings(testConfig); 
        //let status:Error|true = c.validate();


        expect(true).toBe(true);
    });
});