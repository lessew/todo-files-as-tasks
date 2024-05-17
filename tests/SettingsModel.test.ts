import { SettingsModel, SettingsSavedFormatType } from "../src/core/Configuration/SettingsModel";
import { BasenamePropertySettings } from "../src/core/Properties/Basename/BasenamePropertySettings";
import { BooleanYAMLPropertySettings } from "../src/core/Properties/BooleanYAML/BooleanYAMLPropertySettings";
import { ToplevelFolderPropertySettings } from "../src/core/Properties/ToplevelFolder/ToplevelFolderPropertySettings";
import { WhitelistYAMLPropertySettings } from "../src/core/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { PluginSettings } from "../src/core/Configuration/PluginSettings";
import { Whitelist } from "../src/core/Properties/Whitelist";

const settings = new PluginSettings()
.add(new BasenamePropertySettings("title"))
.add(new BooleanYAMLPropertySettings("starred","false",new Whitelist(["true","false"])))
.add(new ToplevelFolderPropertySettings("project")
    .setProjects(new Whitelist(["home","work"]))
    .setDefaultValue("home")
)
.add(new WhitelistYAMLPropertySettings("context","desk",new Whitelist(["phone","desk"])));

const deepCopy:SettingsSavedFormatType = {
    properties : [
        {
            propName:"title",
            defaultValue:"",
            type:"basename"
        },
        {
            propName:"starred",
            defaultValue:"false",
            whitelist:["true","false"],
            type:"booleanYAML"
        },
        {
            propName:"project",
            defaultValue:"home",
            whitelist:["home","work"],
            type:"toplevelfolder"
        },
        {
            propName:"context",
            defaultValue:"desk",
            whitelist:["phone","desk"],
            type:"whitelistYAML"
        }
    ]
}

describe('SettingsModel: deepcopy)', () => {
    let input = settings;
    let expectedDeepCopy = deepCopy;

    test('Test deepcopy', () => {   
        let result = SettingsModel.deepCopy(settings);
        expect(result.properties[0].propName).toBe("title");
        expect(result.properties[1].whitelist![0]).toBe("true");
        expect(result.properties[2].defaultValue).toBe("home");
        if(result.properties[2].whitelist!=undefined){
            expect(result.properties[2].whitelist[0]).toBe("home");
        }
        else{
            expect(true).toBe(false)
        }

        expect(result.properties[3].defaultValue).toBe("desk");
        if(result.properties[3].whitelist!=undefined){
            expect(result.properties[3].whitelist[1]!).toBe("desk");
        }
        else{
            expect(true).toBe(false)
        }
    });
    
});


describe('SettingsModel: loadDeepcopy)', () => {
    let input = deepCopy;
    let expected = settings;

    test('Test loading deepcopy', () => {   
        let result:PluginSettings = SettingsModel.loadDeepCopy(input);
        let map = result.getAsMap();
        let title = map.get("title") as BasenamePropertySettings;
        expect(title.propName).toBe("title");

        let project = map.get("project") as ToplevelFolderPropertySettings;
        expect(project.whitelist.size()).toBe(2)

        let context = map.get("context") as WhitelistYAMLPropertySettings;
        expect(context.defaultValue).toBe("desk")
        expect(context.getType()).toBe("whitelistYAML")
    });
    
});
