import { TodoListBuilder } from "../src/core/TodoListBuilder";
import { FileAndFolderCollection } from "../src/core/FileAndFolderCollection";
import { Query } from "../src/core/Query";

import { TestMockYatodoApp } from "./mainMockTestApp/TestMockYatodoApp";
import { mockContextIdValues, mockStatusIdValues } from "./mockData/mockFileProperties";
import {validContextValuesDeskDeepThinking,validStatusValuesInboxDone} from "./mockData/mockFileProperties";
import { mockFiles } from "./mockData/mockFiles";

let mockYatodoApp:TestMockYatodoApp = new TestMockYatodoApp();
mockYatodoApp.setMarkdownFiles(mockFiles);

let fileAndFolderCollection:FileAndFolderCollection = new FileAndFolderCollection(mockYatodoApp);
fileAndFolderCollection.build("/home/");


describe('Todo List Builder with valid input', () => {
   let tlb:TodoListBuilder;

    test('check filter on status inbox', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection,validStatusValuesInboxDone,validContextValuesDeskDeepThinking);
        tlb.build({ rootPath:"/home/", status:mockStatusIdValues.inbox} as Query);
        expect(tlb.todos.length).toBe(3);
    });
    test('check filter on status done', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection,validStatusValuesInboxDone,validContextValuesDeskDeepThinking);
        tlb.build({ rootPath:"/home/", status:mockStatusIdValues.done} as Query);
        expect(tlb.todos.length).toBe(2);
    });
    test('check filter on no status', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection,validStatusValuesInboxDone,validContextValuesDeskDeepThinking);
        tlb.build({ rootPath:"/home/"} as Query);
        expect(tlb.todos.length).toBe(5);
    });

    test('check filter on context deep thinking', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection,validStatusValuesInboxDone,validContextValuesDeskDeepThinking);
        tlb.build({ rootPath:"/home/", context:mockContextIdValues.deep_thinking} as Query);
        expect(tlb.todos.length).toBe(3);
    });
    test('check filter on context desk', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection,validStatusValuesInboxDone,validContextValuesDeskDeepThinking);
        tlb.build({ rootPath:"/home/", context:mockContextIdValues.desk} as Query);
        expect(tlb.todos.length).toBe(2);
    });
    test('check filter on no context', () => {
        tlb = new TodoListBuilder(fileAndFolderCollection,validStatusValuesInboxDone,validContextValuesDeskDeepThinking);
        tlb.build({ rootPath:"/home/"} as Query);
        expect(tlb.todos.length).toBe(5);
    });
});