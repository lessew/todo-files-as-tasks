import { File } from "../src/core/File";
import { Status, Context } from "../src/core/FileProperties";


export class MockFile implements File{

    mockFileInput:MockFileInput;
    path:string;

    constructor(mfi:MockFileInput){
        this.mockFileInput = mfi;
        this.path = mfi.path;
    }
    
    move(newPath:string):boolean{
        return false;
    }

    isFolder():boolean{
        return this.mockFileInput.isFolder;
    }

    isMarkdownFile():boolean{
        return this.mockFileInput.isMarkdownFile
    }

    isFile():boolean{
        return this.mockFileInput.isFile;
    }

    getYAMLProperty(name:string):any{
        return this.mockFileInput[name as keyof typeof this.mockFileInput]
    }

    setYAMLProperty(prop_name:string,prop_value:string):boolean{
        return true;
    }

    getFolderName(): string {
        return this.mockFileInput.project;
    }

    getFileName():string{
        return this.mockFileInput.filename;
    }

    getFileNameWithoutExtension():string{
        return this.mockFileInput.title;
    }
}

export type MockFileInput = {
    path:string,
    filename:string,
    title:string,
    context:Context | string,
    status:Status | string,
    project:string,
    isMarkdownFile:boolean,
    isFile:boolean,
    isFolder:boolean
}