import { Filesystem } from "./Filesystem";

export class File{
    fs:Filesystem;
    fullPath:string;

    constructor(fullPath:string,fs:Filesystem){
        this.fs = fs;
        this.fullPath = fullPath;
        if(!fs.pathIsFile(fullPath)){
            throw new Error(`"${fullPath}" is not a File`);
        }
    }

    move(newPath:string):Promise<void>{
        return this.fs.move(this.fullPath, newPath);
    }

    getYAMLProperty(name:string):string | null{
        return this.fs.getYAMLProperty(this.fullPath, name);  
    };
    
    async setYAMLProperty(name:string,value:string):Promise<void>{
        return this.fs.setYAMLProperty(this.fullPath,name,value);
    }

}

 