import { TaskList } from "../src/core/TaskList";
import { Query } from "../src/core/Query";
import { MockFile } from "./mainMockTestApp/MockFile";
import { File } from "../src/core/File"
import { TaskConfiguration } from "../src/core/TaskConfiguration";
import { ValidContextValues, ValidProjectValues, ValidStatusValues } from "../src/core/FilePropertyValues";

function getConfiguration():TaskConfiguration{
    let vcv = new ValidContextValues();
    vcv.addValue("desk","Desk");
    vcv.addValue("deep_thinking","Deep thinking");
    
    let vsv = new ValidStatusValues();
    vsv.addValue("done","Done");
    vsv.addValue("inbox","Inbox");
    
    let vpv = new ValidProjectValues();
    vpv.addValue("errands","Errands");
    vpv.addValue("work","Work");
    
    let config = new TaskConfiguration(vpv,vsv,vcv);  
    return config;
}

function getFiles():File[]{
    let inputs = [
        {
            path:"/ROOT/errands/jumbo.md",
            yaml: {status:"inbox",context:"desk"}
        },
        {
            path:"/home/errands/hema.md",
            yaml: {status:"inbox",context:"desk"}
        },
        {
            path:"/home/hobby/play-with-duplo.md",
            yaml: {status:"done",context:"deep_thinking"}
        },
        {
            path:"/home/hobby/football.md",
            yaml: {status:"inbox",context:"desk"}
        }
    ]

    const mockFiles:File[] = [];
    inputs.forEach(inp => {
        const aFile = new MockFile(inp.path);
        aFile.loadYaml(inp.yaml);
        mockFiles.push(aFile as File);
    })
    return mockFiles;
}

describe('Task List: filter on root path', () => {
    let query:Query = {
        rootPath:"/home/"
    }
    let taskList = new TaskList(getFiles(),query,getConfiguration());
    test('root path /home/', () => {    
        expect(taskList.get().length).toBe(3);
    });
});
describe('Task List: filter on status done', () => {
    let query:Query = {
        rootPath:"/home/",
        status:"done"
    }
    let taskList = new TaskList(getFiles(),query,getConfiguration());
    test('check filter on status done', () => {
        expect(taskList.get().length).toBe(1);
    });
});
describe('Task List: filter on context deep_thinking', () => {
    let query:Query = {
        rootPath:"/home/",
        context:"deep_thinking"
    }
    let taskList = new TaskList(getFiles(),query,getConfiguration());
    test('check filter on context deep_work', () => {
        expect(taskList.get().length).toBe(1);
    });
});

