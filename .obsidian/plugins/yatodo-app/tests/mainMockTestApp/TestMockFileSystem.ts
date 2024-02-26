import { File } from "../../src/core/File";
import { FileSystem } from "src/core/FileSystem";


export class TestMockFileSystem extends FileSystem{
    yaml:{context:string,status:string};


    loadYaml(yaml:{context:string,status:string}):void{
        this.yaml = yaml
    }

    getMarkdownFiles(): File[] {
        throw new Error("Method not implemented.");
    }
    
    getFolders(): string[] {
        throw new Error("Method not implemented.");
    }

    getYAMLProperty(name: string): string {
        // @ts-ignore 
        return this.yaml[name];
    }

    move(newFullPath: string): void {

    }

    setYAMLProperty(name: string, value: string): void {

    }
    
}
