import { YAMLParser } from "../src/core/YAMLParser";
import { Query } from "../src/core/Query";
import { TaskConfiguration } from "../src/core/TaskConfiguration";
import { ValidContextValues, ValidProjectValues, ValidStatusValues } from "../src/core/FilePropertyValues";


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
    
    let config = new TaskConfiguration(vpv,vsv,vcv);  
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
    let parser = new YAMLParser(config.validContextValues,config.validStatusValues);
  
    test('test correctly formatted string',() => {
        let q:Query = parser.parse(correctlyFormatted);
        expect(q.context).toBe("desk");
        expect(q.status).toBe("inbox");
        expect(q.rootPath).toBe(".");
    });  

    test('test correctly formatted string with no status field',() => {
        let q:Query = parser.parse(correctlyFormattedWithoutStatus);
        expect(q.context).toBe("desk");
        expect(q.status).toBe(undefined);
        expect(q.rootPath).toBe(".");
    });  

    test('test correctly formatted string with no context field',() => {
        let q:Query = parser.parse(correctlyFormattedWithoutContext);
        expect(q.context).toBe(undefined);
        expect(q.status).toBe("inbox");
        expect(q.rootPath).toBe(".");
    });  

    test('test correctly formatted string with no status nor context field',() => {
        let q:Query = parser.parse(correctlyFormattedWithoutContextAndStatus);
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
    
    let parser = new YAMLParser(config.validContextValues,config.validStatusValues);
  
    test('test badly formatted path',() => {
        let q:Query = parser.parse(incorrectlyFormattedPath);
        expect(q.rootPath).toBe("."); 
    });  

    test('test badly formatted status',() => {
        let q:Query = parser.parse(incorrectlyFormattedStatus);
        expect(q.rootPath).toBe("."); 
    });  

    test('test badly formatted context',() => {
        let q:Query = parser.parse(incorrectlyFormattedContext);
        expect(q.rootPath).toBe("."); 
    });  

    test('test invalid status',() => {
        let q:Query = parser.parse(invalidStatus);
        expect(q.rootPath).toBe("."); 
    });  
    
    test('test invalid context',() => {
        let q:Query = parser.parse(invalidContext);
        expect(q.rootPath).toBe("."); 
    });  
  });