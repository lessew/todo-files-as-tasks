import { TaskBuilder } from "../../src/core/TaskBuilder";
import { File } from "../../src/core/File";


class Helper {
    static getFiles(names:string[]):File[]{
        let result:File[] = [];
        names.forEach((name => {
            let aFile = new File(name);
            result.push(aFile);
        }));
        return [];
    }
}

let files = Helper.getFiles(["this","that","zus","zo"])
let fl = new TaskBuilder(files);

describe('Empty test', () => {
    test('empty', () => {    
        expect(true).toBe(true);
    });
});