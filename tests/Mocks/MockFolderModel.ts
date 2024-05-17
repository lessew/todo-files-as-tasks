import { FileModel } from "../../src/FileSystem/FileModel";
import { FolderModel } from "../../src/FileSystem/FolderModel";
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