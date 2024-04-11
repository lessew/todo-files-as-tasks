import { MockPropertyPerstistenceStrategy } from "./MockPropertyPerstistenceStrategy";
import { File } from "../../src/core/File";

export class MockFile extends File{
    constructor(path:string){
        super(path,new MockPropertyPerstistenceStrategy(path));
    }
}