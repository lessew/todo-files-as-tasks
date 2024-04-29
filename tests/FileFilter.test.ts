import {Filter, FilterOperator} from "../src/core/Filter";
import { FileAsTask } from "../src/core/FileAsTask";
import { Whitelist } from "../src/core/Whitelist";
import { MockFileModel } from "./Mocks/MockFileModel";
import { Settings } from "../src/core/Settings";
import { WhitelistYAMLPropertySettings } from "../src/core/Properties/WhitelistYAML/WhitelistYAMLPropertySettings";


class Helper {
    static getFiles(testerFiles:any[]):FileAsTask[]{
        let result: FileAsTask[] = [];
        let settings = new Settings()
            .add(new WhitelistYAMLPropertySettings("status","Inbox",new Whitelist(["Inbox","Done"])))
            .add(new WhitelistYAMLPropertySettings("context","Desk",new Whitelist(["Phone","Desk"])))

        testerFiles.forEach((afile => {
            let file = new MockFileModel(afile.path,{status:afile.status,context:afile.context});
            let fat = new FileAsTask(file,settings);
            result.push(fat);
        }));
        return result;
    }
}

const file1:any = {
    path:"path/to/this",
    status:"Inbox",
    context:"Phone"
};
const file2:any = {
    path:"path/to/this",
    status:"InvalidValue",
    context:"Desk"
}
const file3:any = {
    path:"path/to/this",
    status:"Done",
    context:"Desk"
};
const file4:any = {
    path:"path/to/this",
    status:"Inbox",
    context:"Desk"
}

let testerFiles = [file1,file2,file3,file4];

let files = Helper.getFiles(testerFiles)
