import { FileModel } from "src/core/FileModel";

export class MockFileModel extends FileModel{
    name: string;
    path: string;
    yaml:any;

    
    constructor(path:string,yaml:any){
        super();
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