import { Todo } from "../src/Todo";
import { Status, Context } from "../src/FileProperties";
import {File} from "../src/File";
import { MockFile,MockFileInput } from "./MockFile";


describe('testing todo class with valid input', () => {
    const f:MockFileInput = {
      path:"/root/errands/jumbo.md",
      filename:"jumbo.md",
      title:"jumbo",
      status:Status.next,
      context:Context.desk,
      project:"errands",
      isFile:true,
      isMarkdownFile:true,
      isFolder:false
    };

   let mf:File = new MockFile(f);
   let todo = new Todo(mf);
  
    test('check if folder is correct', () => {
        expect(todo.project).toBe(f.project);
      });

      test('check if task name is correct', () => {
        expect(todo.title).toBe(f.title);
      });

    test('test if status is correct',() => {
        expect(todo.status).toBe(f.status);
    });

    test('test if context is correct',() => {
      expect(todo.context).toBe(f.context);
    });
});

describe('testing todo class with invalid input', () => {
  const f:MockFileInput = {
    path:"/root/errands/jumbo.md",
    filename:"jumbo.md",
    title:"jumbo",
    status:"invalid status",
    context:"invalud context",
    project:"errands",
    isFile:true,
    isMarkdownFile:true,
    isFolder:false
  };

let mf:File = new MockFile(f);
let todo = new Todo(mf);


  test('test if status gives errors',() => {
      expect(todo.status).toBe(false);
  });

  test('test if context gives errors',() => {
    expect(todo.context).toBe(false);
  });

  test('test if context deep thinking is successfully read',() => {
    const f:File = new MockFile({
      path:"/root/errands/jumbo.md",
      filename:"jumbo.md",
      title:"deep thinking issue",
      status:"invalid status",
      context:Context.deep_thinking,
      project:"errands",
      isFile:true,
      isMarkdownFile:true,
      isFolder:false
    } as MockFileInput);

    const td:Todo = new Todo(f);
    expect(td.context).toBe(Context.deep_thinking);
    
  });


});