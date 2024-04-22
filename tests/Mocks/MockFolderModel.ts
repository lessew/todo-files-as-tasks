import { FileModel } from "src/core/FileModel";
import { FolderModel } from "../../src/core/FolderModel";
import { MockFileModel } from "./MockFileModel";

export class MockFolderModel extends FolderModel{
    path:string;
    children:(FileModel | FolderModel)[];
    
    constructor(path:string,children:(MockFileModel | MockFolderModel)[]){
        super();
        this.path = path;
        this.children = children;
    }
}