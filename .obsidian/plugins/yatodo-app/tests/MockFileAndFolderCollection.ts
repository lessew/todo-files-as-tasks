import { FileAndFolderCollection } from "../src/core/FileAndFolderCollection";
import { File } from "../src/core/File";
import { Folder } from "../src/core/Folder";
import { MockFile } from "./MockFile";
import { Status, Context } from "../src/core/FileProperties";

export class MockFileAndFolderCollection extends FileAndFolderCollection{
    

    private _mockedInputFiles:File[];

    files: File[];
    folders: Folder[];
    rootPath: string;

    constructor(files:File[]){
        super();
        this._mockedInputFiles = files;
    }

    getAllMarkdowndownFiles(): File[] {
        return this._mockedInputFiles;
    }
    

}