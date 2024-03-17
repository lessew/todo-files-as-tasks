
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
/*
    test('filters',() => {
        p.setFilePropertiesToParse(n.properties)

        const filters:{propertyName:string,propertyValue:string}[] = p.parse();

        expect(filters.length).toBe(2);
        expect(filters[1].propertyName).toBe("context");
        expect(filters[1].propertyValue).toBe("desk")
        expect(filters[0].propertyName).toBe("status");
        expect(filters[0].propertyValue).toBe("inbox")
    })
    */
});

/*
describe('yaml parser correctly formatted without context', () => {
    let p = new YAMLParser(correctlyFormattedWithoutContext);
   
    test('filters',() => {
        const n = new MockFile("dummy",new MockFileSystemFacade());
        p.setFilePropertiesToParse(n.properties)

        const filters:{propertyName:string,propertyValue:string}[] = p.parse();

        expect(filters.length).toBe(1);
        expect(filters[0].propertyName).toBe("status");
        expect(filters[0].propertyValue).toBe("inbox")
    })
});
*/

/*
describe('yaml parser only rootpath', () => {
    let p = new YAMLParser(onlyRootPath);

    test('filters',() => {
        const n = new MockFile("dummy",new MockFileSystemFacade());
        p.setFilePropertiesToParse(n.properties)
        const filters:{propertyName:string,propertyValue:string}[] = p.parse();
        expect(filters.length).toBe(0);
    })
});
*/

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
/*
describe('yaml parser with properties that are not set in task', () => {
    let p = new YAMLParser(nonvalidproperties);

    test('filters',() => {
        const n = new MockFile("dummy",new MockFileSystemFacade());
        p.setFilePropertiesToParse(n.properties)
        const filters:{propertyName:string,propertyValue:string}[] = p.parse();
        expect(filters.length).toBe(0);
    })
});
*/

describe('yaml parser with path ending on slash (not allowed)', () => {
    let p = new YAMLParser(trailingslashinrootpath);

    test('rootPath', () => {    
        expect(p.parseRootPath()).toBe(YAMLParser.DEFAULT_ROOT);
    });
});
 