import { Filesystem } from "./Filesystem";

export class File{
    name:string;
    path:string;
    root:string;
    fs:Filesystem;

    constructor(root:string,path:string,fs:Filesystem){
        this.path = path;
        this.root = root;
        this.fs = fs;
    }

    getFullPath():string{
        return this.root + "/" + this.path;
    }

    move(newPath:string):Promise<void>{
        return this.fs.move(this.getFullPath(), newPath);
    }

    getYAMLProperty(name:string):string | null{
      return this.fs.getYAMLProperty(this.getFullPath(),name);  
    };
    
    async setYAMLProperty(name:string,value:string):Promise<void>{
        return this.fs.setYAMLProperty(this.getFullPath(),name,value);
    }

}

 