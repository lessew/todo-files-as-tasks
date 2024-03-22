
import { YAMLParser } from "../../src/core/YAMLParser";

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
 