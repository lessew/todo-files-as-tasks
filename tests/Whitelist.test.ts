import { Whitelist } from "../src/core/Whitelist";


describe('Whitelist test', () => {
    let wl = new Whitelist(["this","that"]);

    test('Test ', () => {   
        expect(wl.contains("this")).toBe(true);
        expect(wl.contains("that")).toBe(true);
        expect(wl.contains("not")).toBe(false);
    });
});


describe('Whitelist toRecord', () => {
    let wl = new Whitelist(["this","that"]);

    test('Test ', () => {   
        let r = wl.toRecord();
        expect(r["this"]).toBe("this");
        expect(r["that"]).toBe("that");
    });
});