import { FileModel } from "../../src/core/Interfaces/FileModel";

export class MockFileModel extends FileModel{
    name: string;
    path: string;
    root:string;
    yaml:any;

    
    constructor(root:string,path:string,yaml:any){
        super();
        this.root = root;
        this.path = path;
        this.yaml = yaml;
    }
    

    move(newPath: string): void | Promise<void> {
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