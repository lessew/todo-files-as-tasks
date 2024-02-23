import { Todo } from "../src/core/Todo";
import { File } from "../src/core/File";
import {ValidStatusValues,ValidContextValues} from "../src/core/FileProperties"
import { TestMockFile } from "./mainMockTestApp/TestMockFile";
import {mockStatusIdValues, mockContextIdValues} from "./mockData/mockFileProperties";
import { statusValuesInboxDone,contextValuesDeskDeepThinking } from "./mockData/mockFileProperties";


describe('testing todo class with valid input', () => {
   let input = {
    path:"/root/errands/jumbo.md",
    yaml: {status:mockStatusIdValues.inbox,context:mockContextIdValues.desk},
    project:"errands",
    title:"jumbo"
   }

  let mf:File = new TestMockFile(input.path,input.yaml);
  let todo = new Todo(mf,statusValuesInboxDone,contextValuesDeskDeepThinking);
  
    test('check if folder is correct', () => {
        expect(todo.project).toBe(input.project);
      });

      test('check if task name is correct', () => {
        expect(todo.title).toBe(input.title);
      });

    test('test if status is correct',() => {
        expect(todo.status).toBe(input.yaml.status);
    });

    test('test if context is correct',() => {
      expect(todo.context).toBe(input.yaml.context);
    });
});

describe('testing todo class with invalid input', () => {
  let input = {
    path:"/root/errands/jumbo.md",
    yaml: {status:"invalid",context:"invalid"},
    project:"errands",
    title:"jumbo"
   }

let mf:File = new TestMockFile(input.path,input.yaml);
let todo = new Todo(mf,statusValuesInboxDone,contextValuesDeskDeepThinking);

  test('test if status gives errors',() => {
      expect(todo.status).toBe(ValidStatusValues.INVALID_VALUE);
  });

  test('test if context gives errors',() => {
    expect(todo.context).toBe(ValidContextValues.INVALID_VALUE);
  });

  test('test if context deep thinking is successfully read',() => {
    let input = {
      path:"/root/errands/jumbo.md",
      yaml: {status:mockStatusIdValues.deferred,context:mockContextIdValues.deep_thinking},
      project:"errands",
      title:"jumbo"
    }
    let mf:File = new TestMockFile(input.path,input.yaml);
    const td:Todo = new Todo(mf,statusValuesInboxDone,contextValuesDeskDeepThinking);
    expect(td.context).toBe(mockContextIdValues.deep_thinking);
  });


});