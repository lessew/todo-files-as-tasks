import { YAMLParser } from "../src/core/YAMLParser";
import { Query } from "../src/core/Query";
import { TaskConfiguration } from "../src/core/TaskConfiguration";
import { ValidContextValues, ValidProjectValues, ValidStarredValues, ValidStatusValues } from "../src/core/FilePropertyValues";


function getConfiguration():TaskConfiguration{
    let vcv = new ValidContextValues();
    vcv.addValue("desk","Desk");
    vcv.addValue("deep_thinking","Deep thinking");
    
    let vsv = new ValidStatusValues();
    vsv.addValue("inbox","Inbox");
    vsv.addValue("done","Done");
    
    let vpv = new ValidProjectValues();
    vpv.addValue("home","Home");
    vpv.addValue("errands","Errands");

    let vstv = new ValidStarredValues();
    vstv.addValue("starred","Starred");
    vstv.addValue("unstarred","Unstarred");
  
    let config = new TaskConfiguration(vpv,vsv,vcv,vstv);  
    
    return config;
  }
  
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

const config:TaskConfiguration = getConfiguration();

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