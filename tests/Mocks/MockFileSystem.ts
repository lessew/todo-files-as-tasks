import { FileSystem

 } from "src/FileSystem/FileSystem";
export class MockFileSystem implements FileSystem{
    move(currentPath: string, newPath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    readDir(path: string): string[] {
        throw new Error("Method not implemented.");
    }
    pathIsFile(path: string): boolean {
        throw new Error("Method not implemented.");
    }
    pathIsDirectory(path: string): boolean {
        throw new Error("Method not implemented.");
    }
    getYAMLProperty(path: string, propName: string): string | null {
        throw new Error("Method not implemented.");
    }
    setYAMLProperty(path: string, propName: string, propValue: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}