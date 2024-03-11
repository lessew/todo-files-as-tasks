import { TaskBuilder } from "../../src/core/TaskBuilder";
import { File } from "../../src/core/Files/File";
import { MockFile } from "../../tests/TaskBuilder/MockFile";
import { FileSystemFacade } from "../../src/core/Files/FileSystemFacade";
import { MockFileSystemFacade } from "../FileProperties/MockFileSystemFacade";

class Helper{
    static getFilesWithPaths(paths:string[]):File[]{
        let fs:FileSystemFacade = new MockFileSystemFacade();

        let result:File[] = [];
        paths.forEach(p => {
            const f = new MockFile(p,fs);
            result.push(f);
        })
        return result;
    }
    static getFilesWithStatus(status:string[]):File[]{
        let fs:FileSystemFacade = new MockFileSystemFacade();

        let result:File[] = [];
        const p = "/path/";
        status.forEach(s => {
            const f = new MockFile(p,fs);
            f.set("status",s);
            result.push(f);
        })
        return result;
    }
  }

describe('TaskBuilder building paths', () => {
    let pathInputs = [
        "/ROOT/errands/jumbo.md",
        "/home/errands/hema.md",
        "/home/hobby/play-with-duplo.md",
        "/home/hobby/football.md"
      ]

    let tb = new TaskBuilder(Helper.getFilesWithPaths(pathInputs));
   
    test('taskbuilder : building path cannot be fully tested as it uses the filesystem', () => {    
        expect(tb.get().length).toBe(pathInputs.length);
    });
});


describe('TaskBuilder building status', () => {
    let statusInputs = ["inbox","inbox","done","inbox"];
    let tb = new TaskBuilder(Helper.getFilesWithStatus(statusInputs));
    
    test('taskbuilder : building status', () => {    
        expect(tb.filterBy("status","inbox").get().length).toBe(3);
    });
    test('taskbuilder : building status multiple times', () => {    
        expect(tb.filterBy("status","inbox").filterBy("status","done").get().length).toBe(0);
    });

});

describe('TaskBuilder building with non existing property', () => {
    let statusInputs = ["inbox","inbox","done","inbox"];
    let tb = new TaskBuilder(Helper.getFilesWithPaths(statusInputs));
    
    test('taskbuilder : building status', () => {    
        expect(tb.filterBy("doesnotexist","inbox").get().length).toBe(0);
    });
   
});

