import { File } from "../../src/FileSystem/File";
import { MockFileSystem } from "./MockFileSystem";

export class MockFile extends File{
    name: string;
    path: string;
    root:string;
    yaml:any;

    
    constructor(root:string,path:string,yaml:any){
        super(root,path,new MockFileSystem());
        this.root = root;
        this.path = path;
        this.yaml = yaml;
    }
    

    async move(newPath: string): Promise<void> {
        this.path = newPath;
    }
    getYAMLProperty(name: string): string {
        return this.yaml[name];
    }
    async setYAMLProperty(name: string, value: string): Promise<void> {
        await (this.yaml[name] = value);
    }

    createMarkdownFile(path: string): void {
        throw new Error("Method not implemented.");
    }
}