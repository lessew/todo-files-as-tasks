import { FileModel } from "src/core/FileSystem/FileModel";
import { FolderModel } from "../../src/core/FileSystem/FolderModel";
import { MockFileModel } from "./MockFileModel";

export class MockFolderModel extends FolderModel{
    
    reload(): Promise<void> {
        throw new Error("Method not implemented.");
    }
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