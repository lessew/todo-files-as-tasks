import { TestMockYatodoApp } from "./mainMockTestApp/TestMockYatodoApp";
import { FileAndFolderCollection } from "../src/core/FileAndFolderCollection";
import { mockFiles } from "./mockData/mockFiles";

let mockYatodoApp:TestMockYatodoApp = new TestMockYatodoApp();
mockYatodoApp.setMarkdownFiles(mockFiles);

let fileAndFolderCollection:FileAndFolderCollection = new FileAndFolderCollection(mockYatodoApp);
fileAndFolderCollection.build("/home/");

describe('testing valid input', () => {
   
    let fafc:FileAndFolderCollection = new FileAndFolderCollection(mockYatodoApp);

     test('check if number of files is correct', () => {
        fafc.build("/home/");
         expect(fafc.files.length).toBe(5);
         expect(fafc.folders.length).toBe(3);
       });

       test('check if number of files is correct after running build for the second time with different path', () => {
        fafc.build("/ROOT/");
         expect(fafc.files.length).toBe(1);
         expect(fafc.folders.length).toBe(1);
       });
 });