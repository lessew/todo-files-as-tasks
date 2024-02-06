import { Parser } from "../src/Parser";
import { YAMLParser } from "../src/YAMLParser";
import { Query } from "../src/Query";
import {Context,Status} from "../src/FileProperties";
import { YAMLException } from "js-yaml";

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


describe('Testing YAML Parser with correct format', () => {
    
    let parser:Parser = new YAMLParser();
  
    test('test correctly formatted string',() => {
        let q:Query = parser.parse(correctlyFormatted);
        expect(q.context).toBe(Context.desk);
        expect(q.status).toBe(Status.inbox);
        expect(q.rootPath).toBe(".");
    });  

    test('test correctly formatted string with no status field',() => {
        let q:Query = parser.parse(correctlyFormattedWithoutStatus);
        expect(q.context).toBe(Context.desk);
        expect(q.status).toBe(undefined);
        expect(q.rootPath).toBe(".");
    });  

    test('test correctly formatted string with no context field',() => {
        let q:Query = parser.parse(correctlyFormattedWithoutContext);
        expect(q.context).toBe(undefined);
        expect(q.status).toBe(Status.inbox);
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
    
    let parser:Parser = new YAMLParser();
  
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