import { FileAndFolderCollection } from "../src/core/FileAndFolderCollection";
import { File } from "../src/core/File";
import { Folder } from "../src/core/Folder";
import { MockFile } from "./MockFile";
import { Status, Context } from "../src/core/FileProperties";

export class MockFileAndFolderCollection implements FileAndFolderCollection{

    files: File[];
    folders: Folder[];
    rootPath: string | false;

    constructor(files:File[]){
        this.files = files;
    }

}