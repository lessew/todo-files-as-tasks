import { Task } from "../src/core/Task";
import { File } from "../src/core/File";
import {ValidStatusValues,ValidContextValues} from "../src/core/FilePropertyValues"
import { TestMockFile } from "./mainMockTestApp/TestMockFile";
import {mockStatusIdValues, mockContextIdValues} from "./mockData/mockFileProperties";
import { validStatusValuesInboxDone,validContextValuesDeskDeepThinking } from "./mockData/mockFileProperties";


describe('testing todo class with valid input', () => {
   let input = {
    path:"/root/errands/jumbo.md",
    yaml: {status:mockStatusIdValues.inbox,context:mockContextIdValues.desk}
   }

  let mf:TestMockFile = new TestMockFile(input.path);
  mf.loadYaml(input.yaml);
  let todo = new Task(mf,validStatusValuesInboxDone,validContextValuesDeskDeepThinking);
  
    test('check if folder is correct', () => {
        expect(todo.project).toBe("errands");
      });

      test('check if task name is correct', () => {
        expect(todo.title).toBe("jumbo");
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

let mf:TestMockFile = new TestMockFile(input.path);
mf.loadYaml(input.yaml)

let todo = new Task(mf,validStatusValuesInboxDone,validContextValuesDeskDeepThinking);

  test('test if status gives errors',() => {
      expect(todo.status).toBe(ValidStatusValues.INVALID_VALUE);
  });

  test('test if context gives errors',() => {
    expect(todo.context).toBe(ValidContextValues.INVALID_VALUE);
  });

  test('test if context deep thinking is successfully read',() => {
    let input = {
      path:"/root/errands/jumbo.md",
      yaml: {status:mockStatusIdValues.done,context:mockContextIdValues.deep_thinking}
    }
    let mf:TestMockFile = new TestMockFile(input.path);
    mf.loadYaml(input.yaml)
    const td:Task = new Task(mf,validStatusValuesInboxDone,validContextValuesDeskDeepThinking);
    expect(td.context).toBe(mockContextIdValues.deep_thinking);
  });


});