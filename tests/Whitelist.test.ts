import { Whitelist } from "../src/core/Whitelist";


describe('Whitelist test', () => {
    let wl = new Whitelist(["this","that"]);

    test('Test ', () => {   
        expect(wl.contains("this")).toBe(true);
        expect(wl.contains("that")).toBe(true);
        expect(wl.contains("not")).toBe(false);
    });
});