import { MockPropertyModel } from "./MockPropertyModel";
import { File } from "../../src/core/File";

export class MockFile extends File{
    constructor(path:string){
        super(path,new MockPropertyModel(path));
    }
}