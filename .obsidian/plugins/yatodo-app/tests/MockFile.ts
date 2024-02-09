import { File } from "../src/core/File";
import { Status, Context } from "../src/core/FileProperties";


export class MockFile extends File{
    yaml:YAMLMockObj;

    constructor(fullPath:string,yaml:YAMLMockObj){
        super(fullPath);
        this.yaml = yaml;
    }

    getYAMLProperty(name: string): string {
        // @ts-ignore 
        return this.yaml[name];
        //throw new Error("Method not implemented.");
    }
    move(newFullPath: string): void {
        // do nothing
        //throw new Error("Method not implemented.");
    }
    setYAMLProperty(name: string, value: string): void {
        // do nothing
        throw new Error("Method not implemented.");
    }
    
}

type YAMLMockObj = {
    context:string,
    status:string,
};
