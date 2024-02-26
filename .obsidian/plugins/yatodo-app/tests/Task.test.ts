import { Task } from "../src/core/Task";
import { File } from "../src/core/File";
import { ValidStatusValues,ValidContextValues, ValidProjectValues } from "../src/core/FilePropertyValues"
import { TaskConfiguration } from "../src/core/TaskConfiguration";
import { MockFile } from "./mainMockTestApp/MockFile";


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

function getFile(input:any):File{
   let file = new MockFile(input.path);
   file.loadYaml(input.yaml);
   return file;
}


describe('testing todo class with valid input', () => {
  let input = {
    path:"/root/errands/jumbo.md",
    yaml: {status:"inbox",context:"desk"}
   }

  let task = new Task(getFile(input),getConfiguration());

     test('check if folder is correct', () => {
        expect(task.project).toBe("errands");
      });

      test('check if task name is correct', () => {
        expect(task.title).toBe("jumbo");
      });

    test('test if status is correct',() => {
        expect(task.status).toBe(input.yaml.status);
    });

    test('test if context is correct',() => {
      expect(task.context).toBe(input.yaml.context);
    });
});

describe('testing todo class with invalid input', () => {
  let input = {
    path:"/root/errands/jumbo.md",
    yaml: {status:"invalid",context:"invalid"},
    project:"errands",
    title:"jumbo"
   }
  let task = new Task(getFile(input),getConfiguration());

  test('test if status gives errors',() => {
      expect(task.status).toBe(ValidStatusValues.INVALID_VALUE);
  });

  test('test if context gives errors',() => {
    expect(task.context).toBe(ValidContextValues.INVALID_VALUE);
  });

});
