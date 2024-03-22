
import { WhitelistProperty } from "../src/core/Properties/WhitelistProperty";
import { YAMLParser } from "../src/core/YAMLParser";
import { MockPropertyDAO } from "./Mocks/MockPropertyDAO";
import { Property } from "../src/core/Interfaces/Property";
import { Filter_Operator } from "../src/core/Interfaces/Filter";

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

describe('yaml parser with not valid value', () => {
    let p = new YAMLParser(errorvalue);
    let filters:Record<string,Property>={
        "status":new WhitelistProperty("status","/path/todo.md",new MockPropertyDAO("-"),["done","inbox"])
    }
    let result = p.parseFilters(filters);
    test("testing filter", () => {    
        expect(result.length).toBe(0);
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
});


describe('yaml parser with negating filter', () => {
    let p = new YAMLParser(notdone);
    let filters:Record<string,Property>={
        "status":new WhitelistProperty("status","/path/todo.md",new MockPropertyDAO("-"),["done","inbox"])
    }
    let result = p.parseFilters(filters);
    test("testing filter", () => {    
        expect(result.length).toBe(1);
        expect(result[0].propertyName).toBe("status");
        expect(result[0].propertyValue).toBe("done");
        expect(result[0].operator).toBe(Filter_Operator.exclude);
    });

});
