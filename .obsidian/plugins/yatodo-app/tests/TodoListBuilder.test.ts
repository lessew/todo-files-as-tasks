import { File } from "../src/File";
import { MockFile,MockFileInput } from "./MockFile";
import {Status,Context} from "../src/FileProperties";
import { TodoListBuilder } from "../src/TodoListBuilder";
import { FileCollection } from "../src/FileCollection";
import { MockFileCollection } from "./MockFileCollection";
import { Query } from "../src/Query";

const f1:File = new MockFile({
    path:"/home/errands/jumbo1.md",
    filename:"jumbo1.md",
    title:"jumbo1",
    status:Status.next,
    context:Context.deep_thinking,
    project:"errands",
    isFile:true,
    isMarkdownFile:true,
    isFolder:false
} as MockFileInput);
const f2:File = new MockFile({
    path:"/home/errands/hema.md",
    filename:"hema.md",
    title:"hema",
    status:Status.deferred,
    context:Context.deep_thinking,
    project:"errands",
    isFile:true,
    isMarkdownFile:true,
    isFolder:false
} as MockFileInput);
const f3:File = new MockFile({
    path:"/home/errands/diswash.md",
    filename:"diswash.md",
    title:"diswash",
    status:Status.next,
    context:Context.phone,
    project:"errands",
    isFile:true,
    isMarkdownFile:true,
    isFolder:false
} as MockFileInput);
const f4:File = new MockFile({
    path:"/home/finance/pay-erik.md",
    filename:"pay-erik.md",
    title:"pay-erik",
    status:Status.inbox,
    context:Context.phone,
    project:"finance",
    isFile:true,
    isMarkdownFile:true,
    isFolder:false
} as MockFileInput);
const f5:File = new MockFile({
    path:"/home/hobby/play-with-duplo.md",
    filename:"/play-with-duplo.md",
    title:"/play-with-duplo",
    status:Status.inbox,
    context:Context.phone,
    project:"hobby",
    isFile:true,
    isMarkdownFile:true,
    isFolder:false
} as MockFileInput);
const f6:File = new MockFile({
    path:"/home/hobby/football.md",
    filename:"football.md",
    title:"football",
    status:Status.waiting_for,
    context:Context.read,
    project:"hobby",
    isFile:true,
    isMarkdownFile:true,
    isFolder:false
} as MockFileInput);

const files:File[] = [f1,f2,f3,f4,f5,f6];
const fileCollection:FileCollection = new MockFileCollection(files);

describe("Todo List Builder - root path is not under test as it is set at filecollection level",() => {
    let tlb:TodoListBuilder;
    test('empty test, to be implement', () => {
        expect(1).toBe(1);
    })
});

describe('Todo List Builder with valid input', () => {
   let tlb:TodoListBuilder;

    test('check filter on status next', () => {
        tlb = new TodoListBuilder(fileCollection);
        tlb.build({ rootPath:"/home/", status:Status.next} as Query);
        expect(tlb.todos.length).toBe(2);
    });
    test('check filter on status deferred', () => {
        tlb = new TodoListBuilder(fileCollection);
        tlb.build({ rootPath:"/home/", status:Status.deferred} as Query);
        expect(tlb.todos.length).toBe(1);
    });
    test('check filter on no status', () => {
        tlb = new TodoListBuilder(fileCollection);
        tlb.build({ rootPath:"/home/"} as Query);
        expect(tlb.todos.length).toBe(6);
    });

    test('check filter on context deep thinking', () => {
        tlb = new TodoListBuilder(fileCollection);
        tlb.build({ rootPath:"/home/", context:Context.deep_thinking} as Query);
        expect(tlb.todos.length).toBe(2);
    });
    test('check filter on context desk', () => {
        tlb = new TodoListBuilder(fileCollection);
        tlb.build({ rootPath:"/home/", context:Context.desk} as Query);
        expect(tlb.todos.length).toBe(0);
    });
    test('check filter on no context', () => {
        tlb = new TodoListBuilder(fileCollection);
        tlb.build({ rootPath:"/home/"} as Query);
        expect(tlb.todos.length).toBe(6);
    });
});

