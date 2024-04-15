import { FolderModel } from "src/core/Interfaces/FolderModel";
import { FileModel } from "../../src/core/Interfaces/FileModel";

export class MockFileModel implements FileModel{
    name: string;
    path: string;
    parent: FolderModel;

    /*
    constructor(path:string){
        this.path = path;
    }
    */

    move(newPath: string): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
    getYAMLProperty(name: string): string {
        throw new Error("Method not implemented.");
    }
    setYAMLProperty(name: string, value: string): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
    createMarkdownFile(path: string): void {
        throw new Error("Method not implemented.");
    }
}