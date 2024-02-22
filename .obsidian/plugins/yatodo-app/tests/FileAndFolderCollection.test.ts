import { File } from "../src/core/File";
import { MockFile } from "./MockFile";
import {Status,Context} from "../src/core/FileProperties";
import { MockYatodoApp } from "./MockYatodoApp";
import { FileAndFolderCollection } from "../src/core/FileAndFolderCollection";

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


let mockYatodoApp:MockYatodoApp = new MockYatodoApp();
mockYatodoApp.setMarkdownFiles(files);

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
        fafc.build("/root/");
         expect(fafc.files.length).toBe(1);
         expect(fafc.folders.length).toBe(1);
       });
 });