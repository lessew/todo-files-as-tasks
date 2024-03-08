
import { YAMLParser } from "../src/core/YAMLParser";

const correctlyFormatted = `
rootPath: .
context: desk
status: inbox`;

const correctlyFormattedWithoutContext = `
rootPath: .
status: inbox`;

const correctlyFormattedWithoutStatus = `
rootPath: .
context: desk`;

const correctlyFormattedWithoutContextAndStatus = `
rootPath: .`;

describe('yaml parser', () => {
    test('empty test', () => {    
        expect(true).toBe(true);
    });
});

/*
describe('Testing YAML Parser with correct format', () => {
    let parser = new YAMLParser();
    parser.loadConfiguration(config);
  
    test('test correctly formatted string',() => {
        parser.loadSource(correctlyFormatted);
        let q:Query = parser.parse();
        expect(q.context).toBe("desk");
        expect(q.status).toBe("inbox");
        expect(q.rootPath).toBe(".");
    });  

    test('test correctly formatted string with no status field',() => {
        parser.loadSource(correctlyFormattedWithoutStatus);
        let q:Query = parser.parse();
        expect(q.context).toBe("desk");
        expect(q.status).toBe(undefined);
        expect(q.rootPath).toBe(".");
    });  

    test('test correctly formatted string with no context field',() => {
        parser.loadSource(correctlyFormattedWithoutContext);
        let q:Query = parser.parse();
        expect(q.context).toBe(undefined);
        expect(q.status).toBe("inbox");
        expect(q.rootPath).toBe(".");
    });  

    test('test correctly formatted string with no status nor context field',() => {
        parser.loadSource(correctlyFormattedWithoutContextAndStatus);
        let q:Query = parser.parse();
        expect(q.context).toBe(undefined);
        expect(q.status).toBe(undefined);
        expect(q.rootPath).toBe(".");
    });  
  });

  const incorrectlyFormattedPath = `
  rootPath: !@#$
  context: desk
  status: inbox`;

  const incorrectlyFormattedStatus = `
  rootPath: .
  context: desk
  status: !@#`;

  const incorrectlyFormattedContext = `
  rootPath: .
  context: !@#
  status: inbox`;
  
  const invalidStatus = `
  rootPath: ./Errands
  context: desk
  status: notexistingstatus`;

  const invalidContext = `
  rootPath: ./Errands
  context: notexistingcontext
  status: inbox`;

describe('Testing YAML Parser with incorrect format', () => {
    
    let parser = new YAMLParser();
    parser.loadConfiguration(config);

    test('test badly formatted path',() => {
        parser.loadSource(incorrectlyFormattedPath);
        let q:Query = parser.parse();
        expect(q.rootPath).toBe("."); 
    });  

    test('test badly formatted status',() => {
        parser.loadSource(incorrectlyFormattedStatus);
        let q:Query = parser.parse();
        expect(q.rootPath).toBe("."); 
    });  

    test('test badly formatted context',() => {
        parser.loadSource(incorrectlyFormattedContext);
        let q:Query = parser.parse();
        expect(q.rootPath).toBe("."); 
    });  

    test('test invalid status',() => {
        parser.loadSource(invalidStatus);
        let q:Query = parser.parse();
        expect(q.rootPath).toBe("."); 
    });  
    
    test('test invalid context',() => {
        parser.loadSource(invalidContext);
        let q:Query = parser.parse();
        expect(q.rootPath).toBe("."); 
    });  
  });
  */