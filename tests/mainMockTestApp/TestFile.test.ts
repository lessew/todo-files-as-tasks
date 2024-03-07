import { File } from "../../src/core/Files/File";
import { FileProperty, StringProperty, WhitelistProperty } from "../../src/core/Files/FileProperty";
 
  class TaskFile extends File {
    properties: Record<string, FileProperty>;
  
    constructor(fullPath:string){
        super(fullPath);    
        this.properties = {
            "title":new StringProperty(this,"Title"),
            "project":new WhitelistProperty(this,"Project")
        }
    }
  }
  
  let tf:TaskFile = new TaskFile("/root/path/to/file.md");
  
  
  describe('basic test', () => {
    test('set and get methods for existing property', () => {
      tf.set("title","shizzle");
      expect(tf.get("title").value).toBe("shizzle");
    });
    test('get method for not yet set value for existing property', () => {
      tf.set("title","shizzle");
      expect(tf.get("project").value).toBe(undefined);
    });
    test('get method for non existing property', () => {
      tf.set("title","shizzle");
      expect(tf.get("notexistingproperty")).toBe(undefined);
    });
  });
  
  describe("test with multiple files, getting multiple title records", () => {
    let taskFileList:TaskFile[] = [];
    for(let i=0;i<10;i++){
      let tf = new TaskFile("/root/path/to/file.md");
      tf.set("title","testtitle " + i);
      taskFileList.push(tf);
    }
  
    test("matching algo correct values",() => {
      let result:TaskFile[] = taskFileList.filter((f) => {
        return f.get("title").matches("test")
      })
      expect(result.length).toBe(10);
    });
  
    test("matching algo correct values pt 2",() => {
      taskFileList[0].set("title","anotherthing");
      let result:TaskFile[] = taskFileList.filter((f) => {
        return f.get("title").matches("test")
      })
      expect(result.length).toBe(9);
    });
  
    test("matching algo not all properties set",() => {
        // @ts-ignore
      taskFileList[0].properties["title"].value = undefined;
      let result:TaskFile[] = taskFileList.filter((f) => {
        return f.get("title").matches("test")
      })
      expect(result.length).toBe(9);
    });
  
  });