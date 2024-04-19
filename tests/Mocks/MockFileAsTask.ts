import { FileAsTask } from "../../src/core/FileAsTask"
import { MockFileModel } from "./MockFileModel";

export class MockFileAsTask extends FileAsTask{
    props:Record<string,string>;

    constructor(props:Record<string,string>){
        super(new MockFileModel("",null),{});
        this.props = props;
    }

    get(propName:string):string{
        return this.props[propName];
    }

    async set(propName:string,propValue:string):Promise<void>{
        this.props[propName] = propValue;
    }
}