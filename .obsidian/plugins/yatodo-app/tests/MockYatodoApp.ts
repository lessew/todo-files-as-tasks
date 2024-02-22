import { File } from "../src/core/File";
import { YaTodoApp } from "../src/core/YaTodoApp";
//import { YaTodoApp } from "src/core/YaTodoApp";

export class MockYatodoApp extends YaTodoApp{
  
    private _mockedInputFiles:File[];

    setMarkdownFiles(inputs:File[]):void{
        this._mockedInputFiles = inputs;
    }

    getAllMarkdowndownFiles(): File[] {
        return this._mockedInputFiles;
    }
    
}