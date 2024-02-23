import { File } from "../../src/core/File";
import { Status, Context } from "../../src/core/FileProperties";


export class TestMockFile extends File{
    yaml:{context:Context,status:Status};

    constructor(fullPath:string,yaml:{context:Context,status:Status}){
        super(fullPath);
        this.yaml = yaml;
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
