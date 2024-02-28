import { File } from "../../src/core/File";
import { FileSystem } from "src/core/FileSystem";


export class MockFileSystem extends FileSystem{
    
    createMarkdownFile(path: string): Promise<File> {
        throw new Error("Method not implemented.");
    }

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
