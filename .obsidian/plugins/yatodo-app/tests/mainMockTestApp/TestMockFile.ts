import { File } from "../../src/core/File";
import { Status, Context } from "../../src/core/FileProperties";


export class TestMockFile extends File{
    yaml:{context:Context,status:Status};

    constructor(fullPath:string){
        super(fullPath);
    }

    loadYaml(yaml:{context:Context,status:Status}):void{
        this.yaml = yaml
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
