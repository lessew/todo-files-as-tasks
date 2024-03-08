import { File } from "../../src/core/Files/File";
import { FileSystemFacade } from "../../src/core/Files/FileSystemFacade";

export class MockFileSystemFacade implements FileSystemFacade{
    getMarkdownFiles(path: string): File[] {
        //throw new Error("Method not implemented.");
        return [];
    }
    getFolders(path: string): string[] {
        return [];
        //throw new Error("Method not implemented.");
    }
    createMarkdownFile(path: string): Promise<File> {
        //return await new File("/path/",this);
        throw new Error("Method not implemented.");
    }
    normalizePath(path: string): string {
        return path;
       // throw new Error("Method not implemented.");
    }
    move(file: File, newFullPath: string): void {
        //throw new Error("Method not implemented.");
    }
    getYAMLProperty(file: File, name: string): string {
        return "";
        //throw new Error("Method not implemented.");
    }

    setYAMLProperty(file: File, name: string, value: string): void {
        //throw new Error("Method not implemented.");
    }
}