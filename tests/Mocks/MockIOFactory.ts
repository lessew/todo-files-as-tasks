import { Directory } from "../../src/FileSystem/Directory";
import { File } from "../../src/FileSystem/File";
import { IOFactory } from "../../src/FileSystem/IOFactory";
import { MockFilesystem } from "./MockFilesystem";

export class MockIOFactory extends IOFactory{
    fs: MockFilesystem;

    constructor(fs: MockFilesystem){
        super();
        this.fs = fs;
    }
    createFile(root: string, path: string): File {
        return new File(root,path,this.fs);
    }
    createDirectory(root: string, path: string): Directory {
        return new Directory(root,path,this,this.fs);
    }
    
}