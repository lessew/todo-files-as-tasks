import { SettingsModel } from "../src/core/SettingsModel";
import { BasenamePropertySettings } from "../src/core/Properties/Basename/BasenamePropertySettings";
import { BooleanYAMLPropertySettings } from "../src/core/Properties/BooleanYAML/BooleanYAMLPropertySettings";
import { ToplevelFolderPropertySettings } from "../src/core/Properties/ToplevelFolder/ToplevelFolderPropertySettings";
import { WhitelistYAMLPropertySettings } from "../src/core/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";
import { Settings } from "../src/core/Settings";
import { Whitelist } from "../src/core/Whitelist";

describe('SettingsModel: deepcopy)', () => {
    let settings = new Settings()
    .add(new BasenamePropertySettings("title"))
    .add(new BooleanYAMLPropertySettings("starred","false",new Whitelist(["true","false"])))
    .add(new ToplevelFolderPropertySettings("project")
        .setProjects(new Whitelist(["home","work"]))
        .setDefaultValue("home")
    )
    .add(new WhitelistYAMLPropertySettings("context","desk",new Whitelist(["phone","desk"])));


    test('Test loading deepcopy', () => {   
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
