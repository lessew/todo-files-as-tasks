import { Whitelist } from "../../src/Properties/Whitelist";
import { BooleanPropertySettings } from "../../src/Properties/Boolean/BooleanPropertySettings";
import { WhitelistPropertySettings } from "../../src/Properties/Whitelist/WhitelistPropertySettings";

describe('BooleanPropertySettings', () => {
	let bps: BooleanPropertySettings;

	beforeEach(() => {
		bps = new BooleanPropertySettings(["true", "false"], "true");
	})

	test('defaultvalue', () => {
		expect(bps.getDefaultValue()).toBe("true");
	});

	test('validate', () => {
		expect(bps.validate("invalid")).toBe(false)
		expect(bps.validate("true")).toBe(true)
	})

	test('toggle', () => {
		expect(bps.getNewToggleValue("true")).toBe("false")
		expect(bps.getNewToggleValue("false")).toBe("true")
	})
});

describe('WhitelistPropertySettings', () => {
	let wps: WhitelistPropertySettings;

	beforeEach(() => {
		wps = new WhitelistPropertySettings(["inbox", "done", "waiting"], "done");
	})

	test('defaultvalue', () => {
		expect(wps.getDefaultValue()).toBe("done");
	});

	test('validate', () => {
		expect(wps.validate("invalid")).toBe(false)
		expect(wps.validate("inbox")).toBe(true)
	})

});
