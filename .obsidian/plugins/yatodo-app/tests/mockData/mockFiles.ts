import { TestMockFile } from "../../tests/mainMockTestApp/TestMockFile";
import { mockContextIdValues, mockStatusIdValues } from "./mockFileProperties";
import { File } from "../../src/core/File";

let inputs = [
    {
        path:"/ROOT/errands/jumbo.md",
        yaml: {status:mockStatusIdValues.inbox,context:mockContextIdValues.desk}
    },
    {
        path:"/home/errands/hema.md",
        yaml: {status:mockStatusIdValues.inbox,context:mockContextIdValues.desk}
    },
    {
        path:"/home/errands/diswash.md",
        yaml: {status:mockStatusIdValues.inbox,context:mockContextIdValues.deep_thinking}
    },
    {
        path:"/home/finance/pay-erik.md",
        yaml: {status:mockStatusIdValues.done,context:mockContextIdValues.deep_thinking}
    },
    {
        path:"/home/hobby/play-with-duplo.md",
        yaml: {status:mockStatusIdValues.done,context:mockContextIdValues.deep_thinking}
    },
    {
        path:"/home/hobby/football.md",
        yaml: {status:mockStatusIdValues.inbox,context:mockContextIdValues.desk}
    }
]

const mockFiles:File[] = [];
inputs.forEach(inp => {
    const aFile:TestMockFile = new TestMockFile(inp.path);
    aFile.loadYaml(inp.yaml);
    mockFiles.push(aFile as File);
})

export {mockFiles};


