import { Directory } from "src/FileSystem/Directory";
import { File } from "src/FileSystem/File";
import { IOFactory } from "src/FileSystem/IOFactory";

export class MockIOFactory implements IOFactory{
    createFile(root: string, path: string): File {
        throw new Error("Method not implemented.");
    }
    createDirectory(root: string, path: string): Directory {
        throw new Error("Method not implemented.");
    }
    isDirectory(input: File | Directory): input is Directory {
        throw new Error("Method not implemented.");
    }
    isFile(input: File | Directory): input is File {
        throw new Error("Method not implemented.");
    }
    
}