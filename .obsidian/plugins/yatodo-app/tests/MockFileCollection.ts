import { FileCollection } from "../src/core/FileCollection";
import { File } from "../src/core/File";
import { MockFile } from "./MockFile";
import { MockFileInput } from "./MockFile";
import { Status, Context } from "../src/core/FileProperties";

export class MockFileCollection implements FileCollection{

    files: File[];
    rootPath: string | false;

    constructor(files:File[]){
        this.files = files;
    }

    queryAllFromRootPath(): void {
        throw new Error("Method not implemented.");
    }
    isValidPath(): boolean {
        throw new Error("Method not implemented.");
    }

}