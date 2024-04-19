import { YAMLParser } from "../src/core/YAMLParser";
import { FilterOperator } from "../src/core/Interfaces/Filter";
import { FATError } from "../src/core/Error";
import { PROPERTYNAMES, Settings } from "../src/core/FileAsTaskSettings";
import { Whitelist } from "../src/core/Whitelist";

class Helper {
    static getSettings(statusAllowedValues:string[]):Settings{
        let wl = new Whitelist(statusAllowedValues);

        return {
            [PROPERTYNAMES.status]: {
                propName: PROPERTYNAMES.status,
                allowedValues: wl,
                defaultValue: ""
            },
            [PROPERTYNAMES.title]: {propName: PROPERTYNAMES.title,defaultValue: ""},
            [PROPERTYNAMES.project]: {propName: PROPERTYNAMES.project,defaultValue: ""},
            [PROPERTYNAMES.context]: {propName: PROPERTYNAMES.context,defaultValue: ""},
            [PROPERTYNAMES.starred]: {propName: PROPERTYNAMES.starred,defaultValue: ""}
        } as Settings
    }
}

// test loadsource
const loadSourceCorrect = `
rootPath: .
action: list`;

const loadSourceIncorrect = `
rootPath: .
actionlist`;

describe('YAMLParser load source', () => {
    test('load correctly formatted source', () => {
        let p = new YAMLParser();
        const result = p.loadSource(loadSourceCorrect);
        expect(result).toBe(true);
    });
    test('load incorrectly formatted source', () => {
        let p = new YAMLParser();
        const result = p.loadSource(loadSourceIncorrect);
        expect(FATError.isError(result)).toBe(true);
    });
});

// test parserootpath
const rootPathCorrect = `
rootPath: todo-home
action: list`;

const rootPathIncorrect = `
rootPath:./@#$@#$
action: list`;

const rootPathTrailingSlash = `
rootPath: todo-home/
context222: desk
status111: !@#`;

describe('YAMLParser parse correctly formatted rootpath', () => {
    test('load correctly formatted source', () => {
        let p = new YAMLParser();
        p.loadSource(rootPathCorrect);
        const result = p.parseRootPath();
        expect(result).toBe("todo-home");
    });
    test('parse incorrectly formatted rootpath', () => {
        let p = new YAMLParser();
        p.loadSource(rootPathIncorrect);
        const result = p.parseRootPath();
        expect(FATError.isError(result)).toBe(true);
    });
    test('parse incorrectly formatted rootpah - trailing slash not allowed', () => {
        let p = new YAMLParser();
        const result = p.loadSource(rootPathTrailingSlash);
        expect(FATError.isError(result)).toBe(true);
    });
});

// test parseaction
const actionListCorrect = `
rootPath: todo-home
action: list`;

const actionButtonCorrect = `
rootPath: todo-home
action: create_button`;

const actionIncorrect = `
rootPath: todo-home
action: blurp`;

describe('YAMLParser parse action', () => {
    test('load correctly formatted source - action list', () => {
        let p = new YAMLParser();
        p.loadSource(actionListCorrect);
        const result = p.parseAction();
        expect(result).toBe(YAMLParser.ACTION_LIST);
    });
    test('load correctly formatted source - action button', () => {
        let p = new YAMLParser();
        p.loadSource(actionButtonCorrect);
        const result = p.parseAction();
        expect(result).toBe(YAMLParser.ACTION_CREATE_BUTTON);
    });
    test('load incorrectly formatted source', () => {
        let p = new YAMLParser();
        p.loadSource(actionIncorrect);
        const result = p.parseAction();
        expect(FATError.isError(result)).toBe(true);
    });
});

// test parseFilters
const filtersCorrect = `
rootPath: todo-home
action: list
status: done`;

const filtersIncorrect = `
rootPath: todo-home
action: list
status: notvalidstatus`;

describe('YAMLParser parse filters', () => {  
    let settings:Settings = Helper.getSettings(["done","inbox"]);

    test('load correctly formatted source - filter', () => {
        let p = new YAMLParser();
        p.loadSource(filtersCorrect);
        let result = p.parseFilters(settings);
        if(!FATError.isError(result)){
            expect(result.length).toBe(1);
            expect(result[0].propertySettings.propName).toBe("status");
            expect(result[0].propertyValue).toBe("done");
            expect(result[0].operator).toBe(FilterOperator.include);
        }
        else{
            expect(true).toBe(false);
        }
    });
    test('load incorrectly formatted source - filter', () => {
        let p = new YAMLParser();
        p.loadSource(filtersIncorrect);
        let result = p.parseFilters(settings);
        
        expect(FATError.isError(result)).toBe(true);
    });
});

// test parseOperators
const notdone = `
rootPath: todo-home
status: not done`;


describe('yaml parser: parse operator test', () => {
    let settings:Settings = Helper.getSettings(["done","inbox"]);
    test("testing parseoperator operator function", () => {
        let p = new YAMLParser();
        let result = p.parseOperator("not done");
        expect(result.operator).toBe("exclude");
        expect(result.value).toBe("done");
    })
    test("testing parseoperator within filter function", () => {
        let p = new YAMLParser();
        p.loadSource(notdone);
        let result = p.parseFilters(settings);
        if(!FATError.isError(result)){
            expect(result.length).toBe(1);
            expect(result[0].propertySettings.propName).toBe("status");
            expect(result[0].propertyValue).toBe("done");
            expect(result[0].operator).toBe(FilterOperator.exclude);
        }
        else{
            expect(false).toBe(true);
        }
    })
    test("testing parseoperator with whitespaces (1)", () => {
        let p = new YAMLParser();
        let result = p.parseOperator("not   done  ");
        expect(result.operator).toBe("exclude");
        expect(result.value).toBe("done");
    })
    test("testing parseoperator with whitespaces (2)", () => {
        let p = new YAMLParser();
        let result2 = p.parseOperator("   done  ");
        expect(result2.operator).toBe("include");
        expect(result2.value).toBe("done");
    })
});
