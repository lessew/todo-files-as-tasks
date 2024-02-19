import { File } from "../src/core/File";
import { MockFile } from "./MockFile";
import {Status,Context} from "../src/core/FileProperties";
import { TodoListBuilder } from "../src/core/TodoListBuilder";
import { FileAndFolderCollection } from "../src/core/FileAndFolderCollection";
import { MockFileAndFolderCollection } from "./MockFileAndFolderCollection";
import { Query } from "../src/core/Query";

let inputs = [
    {
        path:"/root/errands/jumbo.md",
        yaml: {status:Status.next,context:Context.desk},
        project:"errands",
        title:"jumbo"
    },
    {
        path:"/home/errands/hema.md",
        yaml: {status:Status.next,context:Context.desk},
        project:"errands",
        title:"hema"
    },
    {
        path:"/home/errands/diswash.md",
        yaml: {status:Status.next,context:Context.phone},
        project:"errands",
        title:"diswash"
    },
    {
        path:"/home/finance/pay-erik.md",
        yaml: {status:Status.inbox,context:Context.phone},
        project:"finance",
        title:"hema"
    },
    {
        path:"/home/hobby/play-with-duplo.md",
        yaml: {status:Status.inbox,context:Context.deep_thinking},
        project:"hobby",
        title:"play-with-duplo"
    },
    {
        path:"/home/hobby/football.md",
        yaml: {status:Status.waiting_for,context:Context.read},
        project:"hobby",
        title:"football"
    }
]


const files:File[] = [];
inputs.forEach(inp => {
    const aFile:File = new MockFile(inp.path,inp.yaml);
    files.push(aFile);
})

const fileAndFolderCollection:FileAndFolderCollection = new MockFileAndFolderCollection(files);
fileAndFolderCollection.build("/home/");


describe('Todo List Builder with valid input', () => {
   let tlb:TodoListBuilder;

    test('check filter on status next', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection);
        tlb.build({ rootPath:"/home/", status:Status.next} as Query);
        expect(tlb.todos.length).toBe(2);
    });
    test('check filter on status deferred', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection);
        tlb.build({ rootPath:"/home/", status:Status.deferred} as Query);
        expect(tlb.todos.length).toBe(0);
    });
    test('check filter on no status', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection);
        tlb.build({ rootPath:"/home/"} as Query);
        expect(tlb.todos.length).toBe(5);
    });

    test('check filter on context deep thinking', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection);
        tlb.build({ rootPath:"/home/", context:Context.deep_thinking} as Query);
        expect(tlb.todos.length).toBe(1);
    });
    test('check filter on context desk', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection);
        tlb.build({ rootPath:"/home/", context:Context.desk} as Query);
        expect(tlb.todos.length).toBe(1);
    });
    test('check filter on no context', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection);
        tlb.build({ rootPath:"/home/"} as Query);
        expect(tlb.todos.length).toBe(5);
    });
});

describe('Todo List Builder folders found', () => {
    test('tbi', () => {
        //expect(false).toBe(true);
    });
    test('test if folders with no files are also included', () => {
        //expect(false).toBe(true);
    });
});
