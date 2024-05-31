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
    createFile(fullPath: string): File {
        return new File(fullPath,this.fs);
    }
    createDirectory(fullPath: string): Directory {
        return new Directory(fullPath,this,this.fs);
    }
    
}