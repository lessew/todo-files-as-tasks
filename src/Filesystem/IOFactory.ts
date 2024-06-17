import { Directory } from "./Directory";
import { File } from "./File";

export abstract class IOFactory{
    abstract createFile(fullPath:string):File;
    abstract createDirectory(fullPath:string):Directory;

    isDirectory(input: File | Directory): input is Directory {
        return ('children' in input);
    }
    
    isFile(input: File | Directory): input is File {
        return !('children' in input);
    }
}