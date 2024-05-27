import { Filesystem} from "src/FileSystem/Filesystem";
import { MockFilesystemType} from "./MockFilesystemType";

export class MockFilesystem implements Filesystem{
    tree: MockFilesystemType;

    constructor(data: MockFilesystemType) {
        this.tree = data;
        console.log(this.tree);
    }


    async move(currentPath: string, newPath: string): Promise<void> {
    
    }

    readDir(path: string): string[] {
        console.log(path);
        console.log(this.tree.directories[path])
        return this.tree.directories[path];
    }

    pathIsFile(path: string): boolean {
        return path in this.tree.files;
    }

    pathIsDirectory(path: string): boolean {
        return path in this.tree.directories;
    }

    getYAMLProperty(path: string, propName: string): string | null {
        if('yaml' in this.tree.files[path] && 'propName' in this.tree.files[path].yaml!){
            return this.tree.files[path].yaml![propName];
        }
        return null;
    }

    async setYAMLProperty(path: string, propName: string, propValue: string): Promise<void> {
        if(!('yaml' in this.tree.files[path])){
            this.tree.files[path].yaml = {};
        }
        this.tree.files[path].yaml![propName] = propValue;
    }

}