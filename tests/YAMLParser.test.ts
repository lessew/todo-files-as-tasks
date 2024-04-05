import { YAMLParser } from "../src/core/YAMLParser";
import { FilterOperator } from "../src/core/Interfaces/Filter";
import { FATSettings,FATPROPERTY } from "../src/main/FileAsTaskSettings";

class Helper {
    static getSettings(statusAllowedValues:string[]):FATSettings{
        return {
            [FATPROPERTY.status]: {
                allowedValues: statusAllowedValues,
                defaultValue: ""
            },
            [FATPROPERTY.title]: {defaultValue: ""},
            [FATPROPERTY.project]: {defaultValue: ""},
            [FATPROPERTY.context]: {defaultValue: ""},
            [FATPROPERTY.starred]: {defaultValue: ""}
        }
    }
}


const correctlyFormatted = `
rootPath: .
context: desk
status: inbox`;

const correctlyFormattedWithoutContext = `
rootPath: .
status: inbox`;

const onlyRootPath = `
rootPath: .`;


describe('yaml parser correctly formatted', () => {
    let p = new YAMLParser(correctlyFormatted);
    
    test('rootPath', () => {    
        expect(p.parseRootPath()).toBe(".");
    });

});


const incorrectlyFormattedPath = `
rootPath: !@#$
context: desk
status: inbox`;

const nonvalidproperties = `
rootPath: .
context222: desk
status111: !@#`;

const trailingslashinrootpath = `
rootPath: todo-home/
context222: desk
status111: !@#`;



describe('yaml parser correctly formatted', () => {
    let p = new YAMLParser(incorrectlyFormattedPath);
    
    test('rootPath', () => {    
        expect(p.parseRootPath()).toBe(YAMLParser.DEFAULT_ROOT);
    });
});

describe('yaml parser with path ending on slash (not allowed)', () => {
    let p = new YAMLParser(trailingslashinrootpath);

    test('rootPath', () => {    
        expect(p.parseRootPath()).toBe(YAMLParser.DEFAULT_ROOT);
    });
});


const errorvalue = `
rootPath: todo-home/
context: desk
status: statusnotvalid`;

describe('yaml parser with not valid value - should not have any effect and caught elsewhere', () => {
    let p = new YAMLParser(errorvalue);
    
    let settings:FATSettings = Helper.getSettings(["done","inbox"]);

    let result = p.parseFilters(settings);
    test("testing filter", () => {    
        expect(result.length).toBe(2);
    });
});



const notdone = `
rootPath: todo-home/
context: desk
status: not done`;


describe('yaml parser: parse operator test', () => {
    let p = new YAMLParser(notdone);
    let result = p.parseOperator("not done");
    test("testing parseoperator", () => {
        expect(result.operator).toBe("exclude");
        expect(result.value).toBe("done");
    })
});FilterOperator


describe('yaml parser with negating filter', () => {
    let p = new YAMLParser(notdone);
    let settings:FATSettings = Helper.getSettings(["done","inbox"]);
   
    let result = p.parseFilters(settings);
    test("testing filter", () => {    
        expect(result.length).toBe(2);
        expect(result[0].propertyName).toBe("status");
        expect(result[0].propertyValue).toBe("done");
        expect(result[0].operator).toBe(FilterOperator.exclude);
    });

});

describe('yaml parser: parse operator with whitespaces test', () => {
    let p = new YAMLParser(notdone);
    let result = p.parseOperator("not   done  ");
    test("testing parseoperator", () => {
        expect(result.operator).toBe("exclude");
        expect(result.value).toBe("done");
    })
    let result2 = p.parseOperator("   done  ");
    test("testing parseoperator", () => {
        expect(result2.operator).toBe("include");
        expect(result2.value).toBe("done");
    })
});