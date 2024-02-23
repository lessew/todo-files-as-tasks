import { TestMockFile } from "../../tests/mainMockTestApp/TestMockFile";
import { mockContextIdValues, mockStatusIdValues } from "./mockFileProperties";
import { File } from "../../src/core/File";

let inputs = [
    {
        path:"/root/errands/jumbo.md",
        yaml: {status:mockStatusIdValues.inbox,context:mockContextIdValues.desk},
        project:"errands",
        title:"jumbo"
    },
    {
        path:"/home/errands/hema.md",
        yaml: {status:mockStatusIdValues.inbox,context:mockContextIdValues.desk},
        project:"errands",
        title:"hema"
    },
    {
        path:"/home/errands/diswash.md",
        yaml: {status:mockStatusIdValues.inbox,context:mockContextIdValues.phone},
        project:"errands",
        title:"diswash"
    },
    {
        path:"/home/finance/pay-erik.md",
        yaml: {status:mockStatusIdValues.done,context:mockContextIdValues.phone},
        project:"finance",
        title:"hema"
    },
    {
        path:"/home/hobby/play-with-duplo.md",
        yaml: {status:mockStatusIdValues.done,context:mockContextIdValues.deep_thinking},
        project:"hobby",
        title:"play-with-duplo"
    },
    {
        path:"/home/hobby/football.md",
        yaml: {status:mockStatusIdValues.inbox,context:mockContextIdValues.read},
        project:"hobby",
        title:"football"
    }
]

const mockFiles:File[] = [];
inputs.forEach(inp => {
    const aFile:File = new TestMockFile(inp.path,inp.yaml);
    mockFiles.push(aFile);
})

export {mockFiles};


