import { Settings } from "../src/core/Settings";

describe('Settings: create object)', () => {
    let settings = new Settings();
    test('Test addPropertySetting', () => {   
        expect(settings.getAllPropertySettings().size).toBe(0)
        settings.addPropertySetting("status","Inbox")
        expect(settings.getAllPropertySettings().size).toBe(1);
    });
});

describe('Settings: get as array)', () => {
    let settings = new Settings();
    test('Test addPropertySetting', () => {   
        expect(settings.getAllPropertySettings().size).toBe(0)
        settings.addPropertySetting("status","Inbox")
        expect(settings.getAsArray()[0].propName).toBe("status");
        expect(settings.getAsArray()[0].defaultValue).toBe("Inbox");
    });
});