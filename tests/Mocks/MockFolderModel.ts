import { FileModel } from "../../src/FileSystem/File";
import { FolderModel } from "../../src/FileSystem/Directory";
import { MockFileModel } from "./MockFileModel";

export class MockFolderModel extends FolderModel{
    
    path:string;
    root:string;
    children:(FileModel | FolderModel)[];
    
    constructor(root:string,path:string,children:(MockFileModel | MockFolderModel)[]){
        super();
        this.path = path;
        this.root = root;
        this.children = children;
    }

    
}