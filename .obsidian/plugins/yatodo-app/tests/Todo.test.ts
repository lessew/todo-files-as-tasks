import { Todo } from "../src/core/Todo";
import { Status, Context } from "../src/core/FileProperties";
import {File} from "../src/core/File";
import { MockFile } from "./MockFile";


describe('testing todo class with valid input', () => {
   let input = {
    path:"/root/errands/jumbo.md",
    yaml: {status:Status.next,context:Context.desk},
    project:"errands",
    title:"jumbo"
   }

  let mf:File = new MockFile(input.path,input.yaml);
  let todo = new Todo(mf);
  
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

let mf:File = new MockFile(input.path,input.yaml);
let todo = new Todo(mf);

  test('test if status gives errors',() => {
      expect(todo.status).toBe(false);
  });

  test('test if context gives errors',() => {
    expect(todo.context).toBe(false);
  });

  test('test if context deep thinking is successfully read',() => {
    let input = {
      path:"/root/errands/jumbo.md",
      yaml: {status:Status.deferred,context:Context.deep_thinking},
      project:"errands",
      title:"jumbo"
    }
    let mf:File = new MockFile(input.path,input.yaml);
    const td:Todo = new Todo(mf);
    expect(td.context).toBe(Context.deep_thinking);
  });


});