import { File } from "../../src/core/File";


export class MockFile extends File{
    yaml:{context:string,status:string};

    constructor(fullPath:string){
        super(fullPath);
    }

    loadYaml(yaml:{context:string,status:string}):void{
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