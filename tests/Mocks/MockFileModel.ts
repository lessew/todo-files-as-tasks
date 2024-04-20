import { FolderModel } from "src/core/Interfaces/FolderModel";
import { FileModel } from "../../src/core/File";

export class MockFileModel implements FileModel{
    name: string;
    path: string;
    parent: FolderModel;
    yaml:any;

    
    constructor(path:string,yaml:any){
        this.path = path;
        this.yaml = yaml;
    }
    

    move(newPath: string): void | Promise<void> {
        this.path = newPath;
    }
    getYAMLProperty(name: string): string {
        return this.yaml[name];
    }
    setYAMLProperty(name: string, value: string): void | Promise<void> {
        this.yaml[name] = value;
    }

    createMarkdownFile(path: string): void {
        throw new Error("Method not implemented.");
    }
}